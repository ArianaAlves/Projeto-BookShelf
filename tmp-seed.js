"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var default_index_exports = {};
    __export(default_index_exports, {
      Prisma: () => Prisma2,
      PrismaClient: () => PrismaClient2,
      default: () => default_index_default
    });
    module2.exports = __toCommonJS(default_index_exports);
    var prisma2 = {
      enginesVersion: "bb420e667c1820a8c05a38023385f6cc7ef8e83a"
    };
    var version = "6.16.3";
    var clientVersion = version;
    var PrismaClient2 = class {
      constructor() {
        throw new Error('@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.');
      }
    };
    function defineExtension(ext) {
      if (typeof ext === "function") {
        return ext;
      }
      return (client) => client.$extends(ext);
    }
    function getExtensionContext(that) {
      return that;
    }
    var Prisma2 = {
      defineExtension,
      getExtensionContext,
      prismaVersion: { client: clientVersion, engine: prisma2.enginesVersion }
    };
    var default_index_default = { Prisma: Prisma2 };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports2, module2) {
    module2.exports = {
      ...require_default()
    };
  }
});

// prisma/seed/migrate-json-to-sqlite.ts
var import_client = __toESM(require_default2());
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var DATA_DIR = path.resolve(__dirname, "../../data");
var OLD_BOOKS_PATH = path.join(DATA_DIR, "books.json");
var OLD_GENRES_PATH = path.join(DATA_DIR, "genres.json");
var BACKUP_SUFFIX = "-DEPRECATED.json";
var prisma = new import_client.PrismaClient();
async function migrateJsonToSqlite() {
  console.log("--- Iniciando Migra\xE7\xE3o JSON -> SQLite (Prisma) ---");
  if (!fs.existsSync(OLD_BOOKS_PATH) || !fs.existsSync(OLD_GENRES_PATH)) {
    console.warn("\u26A0\uFE0F Arquivos JSON de dados n\xE3o encontrados em /data. Certifique-se de que est\xE3o na pasta raiz e t\xEAm o nome books.json e genres.json.");
    return;
  }
  const oldBooks = JSON.parse(fs.readFileSync(OLD_BOOKS_PATH, "utf-8"));
  const oldGenres = JSON.parse(fs.readFileSync(OLD_GENRES_PATH, "utf-8"));
  console.log(`- Encontrados ${oldBooks.length} livros e ${oldGenres.length} g\xEAneros para migrar.`);
  try {
    console.log("- Criando backup (renomeando com -DEPRECATED)...");
    fs.renameSync(OLD_BOOKS_PATH, OLD_BOOKS_PATH.replace(".json", BACKUP_SUFFIX));
    fs.renameSync(OLD_GENRES_PATH, OLD_GENRES_PATH.replace(".json", BACKUP_SUFFIX));
    console.log("\u2705 Backup conclu\xEDdo. Arquivos originais renomeados.");
  } catch (error) {
    console.error("\u274C Falha ao criar backup. Verifique as permiss\xF5es de pasta. Abortando migra\xE7\xE3o.", error);
    return;
  }
  try {
    await prisma.$transaction(async (tx) => {
      const genreData = oldGenres.map((name) => ({ name }));
      await tx.genre.createMany({
        data: genreData,
        skipDuplicates: true
        // Ignora se o gênero já foi inserido
      });
      const existingGenres = await tx.genre.findMany();
      const bookData = oldBooks.map((book) => {
        const genreRecord = existingGenres.find((g) => g.name === book.genre);
        return {
          // Campos Migrados e Preservados
          id: book.id,
          // Preservando IDs originais (1.7)
          title: book.title,
          author: book.author,
          year: book.year,
          rating: book.rating,
          cover: book.cover,
          // Mapeamento de Gênero
          genreName: book.genre,
          genreId: genreRecord?.id,
          // ID da chave estrangeira
          // Novos Campos e Valores Padrão (Requisito 1.4/1.7)
          synopsis: `Sinopse de ${book.title} (migrada do JSON)`,
          // Valor padrão
          // Se o enum ReadingStatus não estiver disponível pelo client gerado,
          // usamos o valor literal correspondente. Cast para any para evitar erro de tipagem
          status: "QUERO_LER",
          // Padrão
          currentPage: 0,
          // Padrão
          isbn: null,
          notes: null,
          pages: null,
          // Não existia no JSON
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
      });
      const createdBooks = await tx.book.createMany({
        data: bookData,
        skipDuplicates: true
      });
      console.log(`\u2705 ${createdBooks.count} livros inseridos no banco de dados.`);
    });
    console.log("--- Migra\xE7\xE3o Conclu\xEDda com Sucesso! ---");
  } catch (error) {
    console.error("\u274C ERRO CR\xCDTICO NA TRANSA\xC7\xC3O DE MIGRA\xC7\xC3O.", error);
    console.log("**Aten\xE7\xE3o:** Como houve falha, o banco de dados pode estar inconsistente. Consulte a documenta\xE7\xE3o do projeto (1.8) e fa\xE7a a **revers\xE3o manual** do backup (renomeando os arquivos *DEPRECATED.json de volta para .json).");
  } finally {
    await prisma.$disconnect();
  }
}
migrateJsonToSqlite();
