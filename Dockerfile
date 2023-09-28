FROM node:slim
WORKDIR /app
COPY . /app
RUN npm i
RUN npx playwright install
EXPOSE 10000
CMD npm run dev