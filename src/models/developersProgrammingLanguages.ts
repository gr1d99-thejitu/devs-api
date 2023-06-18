import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { Developer } from './developer'
import { ProgrammingLanguage } from './programmingLanguage'

@Entity()
export class DevelopersProgrammingLanguages {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string

  @ManyToOne(() => Developer, (developer) => developer.developers_programming_languages, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'developer_id'
  })
  developer: Developer

  @ManyToOne(
    () => ProgrammingLanguage,
    (programming_language) => programming_language.developers_programming_languages,
    { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' }
  )
  @JoinColumn({
    name: 'programming_language_id'
  })
  programming_language: ProgrammingLanguage

  @Column({ type: 'uuid', nullable: false })
  public programming_language_id: string

  @Column({ type: 'uuid', nullable: false })
  public developer_id: string
}
