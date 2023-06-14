import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity('developers')
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @CreateDateColumn({ type: 'timestamptz', default: 'now()' })
  public readonly createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: 'now()', onUpdate: 'now()' })
  public readonly updatedAt: Date
}
