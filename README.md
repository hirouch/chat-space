# README

# ChatSpace DB設計
## usersテーブル
| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| email    | string | null: false |
| password | string | null: false |
| nickname | string | null: false |
### Association
- has_many :groups
- has_many :messages

## groupsテーブル
| Column  | Type    | Options                        |
| ------- | ------- | ------------------------------ |
| name    | text    | null: false                    |
### Association
- has_many :user
- has_many :messages

## membersテーブル
| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| text     | text    |                                |
| image    | text    |                                |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
### Association
- belongs_to :group
- belongs_to :user