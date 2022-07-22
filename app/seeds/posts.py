from app.models import db, Post


def seed_posts():

    post = Post(
        caption=':droolingface:', imageURL='https://i.imgur.com/v1BpKVW.jpg', userId=1)
    post2 = Post(
        caption='yummy in my tummy', imageURL='https://i.imgur.com/PN2RjpK.png', userId=2)
    post3 = Post(
        caption='rawrxd', imageURL='https://i.imgur.com/s7gnF0I.png', userId=3)
    post4 = Post(
        caption='! ! !', imageURL='https://i.imgur.com/OoTZpwu.png', userId=4)
    post5 = Post(
        caption='@sushisimpin is my dad', imageURL='https://i.imgur.com/QcsgWNC.png', userId=5)
    post6 = Post(
        caption='eat your greens!', imageURL='https://i.imgur.com/t9cUeVr.png', userId=6)
    post7 = Post(
        caption=':O', imageURL='https://i.imgur.com/KtQoSdQ.png', userId=7)
    post8 = Post(
        caption='Pasta with Scallops',  imageURL='https://i.imgur.com/BNNOuJG.png', userId=8)
    post9 = Post(
        caption='No public restrooms. Cant recommend',  imageURL='https://i.imgur.com/byPHvKl.png', userId=9)
    post10 = Post(
        caption='Tyler the Creator!',  imageURL='https://i.imgur.com/Y7KA4Mg.png', userId=10)
    post11 = Post(
        caption='good burgie', imageURL='https://i.imgur.com/E0vEeRL.png', userId=11)
    post12 = Post(
        caption='#mommyblogger #ifhewantedtohewould',  imageURL='https://i.imgur.com/uByZYDj.png', userId=12)
    post13 = Post(
        caption='Not worth it! Do not go here.',  imageURL='https://i.imgur.com/ksYYfZR.png', userId=13)
    post14 = Post(
        caption='#meatyboys', imageURL='https://i.imgur.com/x0x3lxm.png', userId=14)
    post15 = Post(
        caption='HAHAHAHAHAHAHA', imageURL='https://i.imgur.com/pU0zjgV.png', userId=15)
    post16 = Post(
        caption="howlin rays is the best spicy chicken sandwich, don't @ me", imageURL="https://i.imgur.com/CnfM48Y.jpg", userId="16")
    post17 = Post(
        caption="I can eat shabu errrday",  imageURL="https://i.imgur.com/YjcmJfo.jpg", userId="17")
    post18 = Post(
        caption="sesame charcoal icecream, tastes better than it looks!", imageURL="https://i.imgur.com/V7nY5zF.png", userId=18)
    post19 = Post(
        caption="current mood",  imageURL="https://i.imgur.com/5sXM2Xa.png", userId=19)
    post20 = Post(
        caption="back out on the courts!", imageURL="https://i.imgur.com/aFH2DjV.png", userId=20)
    post21 = Post(
        caption="at the lincoln memorial in DC, it's beautiful!", imageURL="https://i.imgur.com/UCbMe36.png", userId=21)
    post22 = Post(
        caption="at the happiest placeon earth!", imageURL="https://i.imgur.com/GQko3VZ.png", userId=22)
    post23 = Post(
        caption="my #1 good boy", imageURL="https://i.imgur.com/cruo1SN.png", userId=23)
    post24 = Post(
        caption="it's beautiful out here in yosemite", imageURL="https://i.imgur.com/yBFHrLH.png", userId=24)
    post25 = Post(
        caption="enjoying all the anime here in akihabara!", imageURL="https://i.imgur.com/lR0sHZf.png", userId=25)
    post26 = Post(
        caption="still the best scene to this day", imageURL="https://i.imgur.com/PfyMKvG.png", userId=26)


    db.session.add(post)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
    db.session.add(post22)
    db.session.add(post23)
    db.session.add(post24)
    db.session.add(post25)
    db.session.add(post26)
    
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
