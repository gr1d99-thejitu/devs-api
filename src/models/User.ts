import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  Exclusion
} from 'typeorm'

@Entity('users')
// @Exclusion('password')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column({
    unique: true,
    nullable: false
  })
  email: string

  @Column({
    nullable: false,
    select: false
  })
  password: string

  static confirm_password: string

  @Column()
  full_names: string

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'CURRENT_TIMESTAMP()' })
  public readonly updated_at: Date
}
