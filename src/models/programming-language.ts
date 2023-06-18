import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  public readonly updated_at: Date
}
