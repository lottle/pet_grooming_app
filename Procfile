db: mkdir -p ${HOME}/.local/share/mongodb && mongod --dbpath ${HOME}/.local/share/mongodb
web: cd server && bundle install && bundle exec rails server -p 3000
client: cd client && npm run dev