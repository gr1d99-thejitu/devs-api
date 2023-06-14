import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({
    unique: true,
    nullable: false
  })
  email: string

  @Column()
  full_names: string

  @CreateDateColumn()
  public readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public readonly updated_at: Date
}
