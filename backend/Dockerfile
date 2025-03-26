# Étape de build
FROM node:18-alpine AS builder

# Définition du répertoire de travail
WORKDIR /app

# Installation des dépendances système
RUN apk add --no-cache \
    postgresql-client \
    git \
    tini

# Copie des fichiers package.json et package-lock.json pour tirer parti du cache Docker
COPY package*.json ./

# Installation des dépendances (y compris les dépendances de développement)
RUN npm ci

# Copie du reste du code de l’application
COPY . .

# Génération du client Prisma (en précisant le bon chemin)
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Build de l’application (si TypeScript ou besoin de compilation)
RUN npm run build

# Étape de production
FROM node:18-alpine

WORKDIR /app

# Installation des dépendances système nécessaires à l'exécution
RUN apk add --no-cache \
    postgresql-client \
    tini

# Copie uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/prisma ./src/prisma
COPY --from=builder /app/package*.json ./

# Assurer que Prisma Client est bien généré
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Création d’un utilisateur non-root pour des raisons de sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Utilisation de Tini comme processus init pour une meilleure gestion des signaux
ENTRYPOINT ["/sbin/tini", "--"]

# Exposition du port sur lequel l’application tourne
EXPOSE 3100

# Vérification de l’état du service
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3100/api/health || exit 1

# Démarrage de l'application avec migration Prisma
CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/prisma/schema.prisma && npm run start:prod"]
