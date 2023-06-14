"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDevelopersTable1686750659145 = void 0;
const typeorm_1 = require("typeorm");
class AddDevelopersTable1686750659145 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'developers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        default: 'uuid_generate_v4()',
                        isPrimary: true
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        foreignKeyConstraintName: 'fk_developer_user_id',
                        isNullable: false
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        isNullable: false,
                        default: 'CURRENT_TIMESTAMP(6)'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP(6)',
                        onUpdate: 'CURRENT_TIMESTAMP(6)'
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('developers');
        });
    }
}
exports.AddDevelopersTable1686750659145 = AddDevelopersTable1686750659145;