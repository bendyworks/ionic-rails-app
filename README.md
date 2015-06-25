# Ionic + Rails

This is code to accompany a screencast about making Rails and Ionic play nicely
together.

## Getting started

Create a folder to hold both sides of the app
```
mkdir ionic-rails
cd ionic-rails
```

## Rails

Perform these steps from within the `ionic-rails` folder you created.

Create the Rails project
```
rails new server
cd server
```

Add `rack-cors` to the `Gemfile`
```
gem 'rack-cors'
```

Run Bundler to refresh your gem store
```
bundle install
```

Enable CORS in `config/application.rb`
```
# put this inside the Application class
config.middleware.insert_before 0, "Rack::Cors" do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post, :options]
  end
end    
```

Create the User scaffold
```
rails g scaffold user firstname:string lastname:string shirtSize:string vegetarian:boolean
```

Allow CORS requests to come through in `app/controllers/user_controller.rb`
```
protect_from_forgery with: :null_session
```
(you can also do this in ApplicationController, but that is app-wide and is not a
great idea..)

Run the Rails migrations
```
rake db:migrate
```

Start the Rails server (in its own terminal)
```
rails s
```

## Ionic

Perform these steps from within the `ionic-rails` folder you created.

Bootstrap from Ionic Template
```
ionic start app https://github.com/bendyworks/ionic-rails-app
```

Start ionic server
```
cd app
ionic serve
```

