
# 💉 gestioneVaccini

**gestioneVaccini** è un'applicazione web completa che consente la gestione online dei vaccini, dei pazienti e degli appuntamenti.  
È pensata per strutture sanitarie, amministratori e pazienti.

## 🚀 Funzionalità principali

- 🧍‍♂️ Gestione dei pazienti
- 💉 Tracciamento dei vaccini somministrati
- 📅 Pianificazione degli appuntamenti
- 🏥 Organizzazione dei centri di vaccinazione
- 🔐 Autenticazione e ruoli (Admin / Utente)*

_*se implementati nel progetto_

---

## 🖥️ Tecnologie utilizzate

### Backend – [Spring Boot](https://spring.io/projects/spring-boot)

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

### Frontend – [ReactJS](https://react.dev/)

- ReactJS
- Bootstrap
- Axios
- React Router

---

## ⚙️ Installazione del progetto

### 1. Clonare il progetto

```bash
git clone https://github.com/arlettemakuissu/gestioneVaccini.git
cd gestioneVaccini
```

---

### 2. Avviare il **backend** (Spring Boot)

```bash
cd gestionevaccini
# Apri application.properties e configura:
# spring.datasource.url=jdbc:mysql://localhost:3306/gestione_vaccini
# spring.datasource.username=IL_TUO_USERNAME
# spring.datasource.password=LA_TUA_PASSWORD

./mvnw spring-boot:run
```

---

### 3. Avviare il **frontend** (React)

```bash
cd ../gestionevaccinifontend
npm install
npm start
```
