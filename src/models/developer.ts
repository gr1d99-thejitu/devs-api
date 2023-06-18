import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { User } from './user'
import { ProgrammingLanguage } from './programmingLanguage'

@Entity('developers')
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: false
  })
  title: string

  @Column({
    nullable: false
  })
  user_id: string

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @ManyToMany(() => ProgrammingLanguage, (programming_language) => programming_language.developers)
  @JoinTable({
    name: 'developers_programming_languages',
    joinColumn: {
      name: 'developer_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'programming_language_id',
      referencedColumnName: 'id'
    }
  })
  programming_languages: ProgrammingLanguage[]

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'now()' })
  public readonly updated_at: Date
}
