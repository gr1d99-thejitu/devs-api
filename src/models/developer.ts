import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user'
import { DevelopersProgrammingLanguages } from './developersProgrammingLanguages'

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

  @OneToMany(
    () => DevelopersProgrammingLanguages,
    (developers_programming_languages) => developers_programming_languages.developer
  )
  developers_programming_languages: DevelopersProgrammingLanguages[]

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'now()' })
  public readonly updated_at: Date
}
