import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { DevelopersProgrammingLanguages } from './developersProgrammingLanguages'
import { Developer } from './developer'

@Entity('programming_languages')
export class ProgrammingLanguage {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string

  @Column({
    nullable: false,
    unique: true
  })
  public name: string

  @OneToMany(() => Developer, (developer) => developer.programming_languages)
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
  developers: Developer[]

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  public readonly created_at: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  public readonly updated_at: Date
}
