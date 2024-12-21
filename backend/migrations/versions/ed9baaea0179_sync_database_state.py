"""Sync database state

Revision ID: ed9baaea0179
Revises: b04a56d054ea
Create Date: 2024-12-20 21:22:56.447328

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed9baaea0179'
down_revision = 'b04a56d054ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('message')
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('email', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('review_text', sa.Text(), nullable=False))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=False))
        batch_op.alter_column('rating',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.drop_column('timestamp')
        batch_op.drop_column('customer_id')
        batch_op.drop_column('content')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.TEXT(), nullable=False))
        batch_op.add_column(sa.Column('customer_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('timestamp', sa.DATETIME(), nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['customer_id'], ['id'])
        batch_op.alter_column('rating',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('created_at')
        batch_op.drop_column('review_text')
        batch_op.drop_column('email')
        batch_op.drop_column('user_id')

    op.create_table('message',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('business_info_id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(length=100), nullable=True),
    sa.Column('message', sa.VARCHAR(length=500), nullable=True),
    sa.Column('created_at', sa.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['business_info_id'], ['business_info.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
