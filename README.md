# Trash Talk (PERN stack application)

A real time chat application with a humorous theme, talking trash :joy:.

View it on [Heroku](https://still-coast-26529.herokuapp.com/)

![chat-app-logos-presentation](https://user-images.githubusercontent.com/29006517/88720856-28493600-d0eb-11ea-8e49-432e6dd65664.png)

[chat-app-gif](<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/YQ5M2k6jwsYbrcfBx3" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/YQ5M2k6jwsYbrcfBx3">via GIPHY</a></p>)

## Summary

I am very happy to present Trash Talk, a safe space to talk trash :laughing:
This is my first project utilizing a Postgres database via Node-Postgres, as well as sockets using Socket.io.

This was by far the most challening project for me to build, however I had a blast doing it and learned so much about how NodeJS works with Psql. While there was a learning curve, My strengthened skills with Javascript, React and the Axios library set me up for success on this one.

Trash Talk has taken me to the next level, and no I'm not trash talking :joy:. Creating my first PERN stack application has brought me to my goal of becoming a full-stack developer. Although there is no finish line in this marathon, I have trained and am ready to continue with this journey.

## Installations Directions

### Requirements

- [PostgreSQL](https://www.postgresql.org/download/)
- [NodeJS](https://nodejs.org/en/download/)

1. Clone this repository into your chosen directory.
2. Open a new pSQL shell and create a new Postgres Database:

   `$ createdb chat_app`

3. Create the necessary tables by copy and pasting the contents of the `2020-19-7.sql` file in the db-backup directory.
4. Go to root directory of this project in your terminal.
5. Add a .env file to fill in your Postgres information (see `sample.env`).
6. Run "npm i" in the root directory.
7. Change the directory to "Client" and run "npm i".
8. Change back to the root directory and run "npm run dev".
9. Open a browser to localhost:5000.
10. Enjoy!

## Author

- **John Mokate** - Programmer [Website](https://mokate.tumblr.com) **|** [LinkedIn](https://www.linkedin.com/in/mokate/)