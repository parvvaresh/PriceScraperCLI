FROM golang:1.22 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /price_scraper .

FROM gcr.io/distroless/static-debian12
COPY --from=build /price_scraper /price_scraper
ENTRYPOINT ["/price_scraper"]
CMD ["-interval=20"]
