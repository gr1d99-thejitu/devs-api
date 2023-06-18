import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany
} from 'typeorm'
import { Developer } from './developer'
import { ProgrammingLanguage } from './programmingLanguage'
import { User } from './user'

@Entity()
export class DevelopersProgrammingLanguages {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string

  @Column({
    nullable: false
  })
  developer_id: string

  @Column({
    nullable: false
  })
  programming_language_id: string

  @OneToMany(() => Developer, (developer) => developer.programming_languages)
  @JoinColumn({
    name: 'developer_id'
  })
  developer: Developer

  @OneToMany(() => ProgrammingLanguage, (programming_language) => programming_language.developers)
  @JoinColumn({
    name: 'programming_language_id'
  })
  programming_language: ProgrammingLanguage

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'now()' })
  public updated_at: Date
}
