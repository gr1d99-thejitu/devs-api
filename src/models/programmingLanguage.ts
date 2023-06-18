import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { DevelopersProgrammingLanguages } from './developersProgrammingLanguages'

@Entity()
export class ProgrammingLanguage {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string

  @Column({
    nullable: false,
    unique: true
  })
  public name: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  public readonly created_at: Date

  @OneToMany(
    () => DevelopersProgrammingLanguages,
    (developers_programming_languages) => developers_programming_languages.programming_language
  )
  developers_programming_languages: DevelopersProgrammingLanguages[]

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  public readonly updated_at: Date
}
