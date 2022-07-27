from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='bobbie', email='bobbie@aa.io', password='password')
    jack = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='jackie', email='jackie@aa.io', password='password')
    matty = User(
        profpic = 'https://cdn.discordapp.com/attachments/998737172335173682/1001887100980973650/download.jpg', username='matty', email='matty@aa.io', password='password')
    john = User(
        profpic='https://i.imgur.com/okVErzG.png',username='john', email='john@aa.io', password='password')
    christian = User(
        profpic='https://i.pinimg.com/736x/30/d2/a6/30d2a6d938a00636f4591f0aa0115854.jpg' ,username='christian', email='christian@aa.io', password='password')
    helicopter = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='helicopter', email='helicopter@aa.io', password='password')
    mrlarsen = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='mrlarsen', email='mrlarsen@aa.io', password='password')
    bradthebard = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='bradthebard', email='bardbrad@aa.io', password='password')
    restroom = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='restroom', email='restroom@aa.io', password='password')
    apple = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='apple', email='apple@aa.io', password='password')
    banana = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='banana', email='banana@aa.io', password='password')
    cookie = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='cookie', email='cookie@aa.io', password='password')
    donut = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='donut', email='donut@aa.io', password='password')
    eggs = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='eggs', email='eggs@aa.io', password='password')
    frenchtoast = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='frenchtoast', email='frenchtoast@aa.io', password='password')
    grape = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='grape', email='grape@aa.io', password='password')
    hotdog = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='hotdog', email='hotdog@aa.io', password='password')
    icecream = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='icecream', email='icecream@aa.io', password='password')
    jello = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='jello', email='jello@aa.io', password='password')
    kandy = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='kandy', email='kandy@aa.io', password='password')
    lemon = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='lemon', email='lemon@aa.io', password='password')
    milk = User(
        profpic='https://i.imgur.com/bjlFtRx.png', username='milk', email='milk@aa.io', password='password')
    noodles = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='noodles', email='noodles@aa.io', password='password')
    orange = User(
        profpic='https://i.imgur.com/bjlFtRx.png' ,username='orange', email='orange@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jack)
    db.session.add(matty)
    db.session.add(john)
    db.session.add(christian)
    db.session.add(helicopter)
    db.session.add(mrlarsen)
    db.session.add(bradthebard)
    db.session.add(restroom)
    db.session.add(apple)
    db.session.add(banana)
    db.session.add(cookie)
    db.session.add(donut)
    db.session.add(eggs)
    db.session.add(frenchtoast)
    db.session.add(grape)
    db.session.add(hotdog)
    db.session.add(icecream)
    db.session.add(jello)
    db.session.add(kandy)
    db.session.add(lemon)
    db.session.add(milk)
    db.session.add(noodles)
    db.session.add(orange)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
