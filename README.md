# Request4Learning

Dieser Prototyp wurde als Teil der Bachelorarbeit von Robert Dimitrov entwickelt. 

Medieninformatik Bachelor  
Beuth Hochschule für Technik  
SS2017


## Voraussetzungen

Es müssen [Node.JS](https://nodejs.org/en/download/) und [MongoDB](https://www.mongodb.com/download-center#community) auf dem Rechner installiert und richtig konfiguriert sein, damit die Anwendung zum Laufen gebracht werden kann.

## Server starten 

In den ```server/``` Ordner navigieren:

```bash
cd server
```

Node Dependencies installieren:

```bash
npm install
```

Server starten:

```bash
npm start
```

Standardmäßig läuft der Server auf ```PORT 3000```. Diese Einstellung kann in der Datei ```config.js``` angepasst werden.

## Client starten

In einem neuen Tab der Kommandozeile in den ```client/``` Ordner navigieren:
In den ```client/``` Ordner navigieren:

```bash
cd client
```

Node Dependencies installieren:

```bash
npm install
```

Client starten:

```bash
npm start
```

Der Client ist jetzt auf ```localhost:8080``` zu finden. Bei richtiger Verknüpfung mit der Datenbank kann man sich mit folgenden Zugansgdaten anmelden:

- Benutzername: student
- Password: request4learning