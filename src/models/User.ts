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

  @Column({
    nullable: false
  })
  password: string

  @Column()
  full_names: string

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'CURRENT_TIMESTAMP()' })
  public readonly updated_at: Date
}
