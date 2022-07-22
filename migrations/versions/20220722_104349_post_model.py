"""post-model

Revision ID: b5e1ec117dfa
Revises: ffdc0a98111c
Create Date: 2022-07-22 10:43:49.927451

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5e1ec117dfa'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=40), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )
    op.create_table(
        'posts',
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("userId", sa.Integer, nullable=False),
        sa.Column("caption", sa.String(50), nullable=False),
        sa.Column("imageURL", sa.String(255), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['userId'], ['users.id'], )
    )
    op.create_table(
        'comments',
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("userId", sa.Integer, nullable=False),
        sa.Column("postId", sa.Integer, nullable=False),
        sa.Column("content", sa.String(500), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
        sa.ForeignKeyConstraint(['postId'], ['posts.id'], )
    )
    op.create_table(
        "followers",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("followerId", sa.Integer, nullable=False),
        sa.Column("followingId", sa.Integer, nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['followerId'], ['users.id'], ),
        sa.ForeignKeyConstraint(['followingId'], ['users.id'], )
    )
    op.create_table(
        "likes",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("postId", sa.Integer, nullable=False),
        sa.Column("userId", sa.Integer, nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
        sa.ForeignKeyConstraint(['postId'], ['posts.id'], )
    )



def downgrade():
    op.drop_table('likes')
    op.drop_table('comments')
    op.drop_table('followers')
    op.drop_table('posts')
    op.drop_table('users')
