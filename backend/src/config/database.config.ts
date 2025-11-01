import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Carrega as variáveis de ambiente do arquivo .env.example
// Isso é necessário se você estiver executando o TypeORM CLI ou scripts de migração fora do NestJS
dotenv.config({ path: resolve(__dirname, '..', '..', '.env.example') });

/**
 * Opções de Configuração para o Módulo TypeOrm (TypeOrmModuleOptions).
 * Este objeto será usado para conectar o NestJS ao banco de dados PostgreSQL.
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
  // Tipo do banco de dados
  type: 'postgres',

  // Detalhes da conexão (lidos das variáveis de ambiente)
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Auto-carrega todas as entidades na pasta 'entity' ou 'entities'
  // IMPORTANTE: Ajuste o caminho conforme a sua estrutura real de pastas.
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  // Sincronização automática de entidades no banco de dados.
  // Use APENAS para desenvolvimento. Em produção, use migrações.
  synchronize: false,

  // Carrega as migrações (ajuste o caminho)
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false, // Não executa migrações automaticamente no boot (melhor para controle manual)

  // Logging detalhado das queries SQL
  logging: ['query', 'error'],
};

// Exporta as opções para o TypeORM CLI (se você estiver usando um arquivo de configuração externo)
export default typeOrmConfig;
