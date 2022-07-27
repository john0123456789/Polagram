from app.models import db, Like

def seed_likes():

    like1 = Like(
        postId=3, userId=1, totalLikes=3)
    like2 = Like(
        postId=2, userId=2, totalLikes=4)
    like3 = Like(
        postId=1, userId=3, totalLikes=4)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
