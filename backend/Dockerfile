# Dockerfile para Backend en Go - Proyecto Recordó
# Stage 1: Build
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY go.mod ./
RUN go mod download

# Copiar código fuente
COPY . .

# Compilar binario estático optimizado
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o recordo-server .

# Stage 2: Runner liviano para producción (Railway / Docker / Vultr)
FROM alpine:3.19

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/recordo-server .

EXPOSE 8080

ENV PORT=8080
ENV ENV=production

CMD ["./recordo-server"]
