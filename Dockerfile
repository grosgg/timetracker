FROM ruby:3.2.2

RUN apt-get update

RUN mkdir /app
WORKDIR /app

COPY Gemfile . Gemfile.lock ./

RUN bundle install

COPY . .
EXPOSE 3000

CMD ["bin/rails", "server", "-b", "0.0.0.0"]