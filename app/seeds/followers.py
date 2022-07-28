from app.models import db, Follower

def seed_follows():

    follow1 = Follower(
        followerId=3, followingId=1)
    follow2 = Follower(
        followerId=2, followingId=1)
    follow3 = Follower(
        followerId=1, followingId=3)

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)

    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
