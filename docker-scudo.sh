#docker run -d -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --network quorum-tessera_quorum_net --name scudo-webapp --rm scudo-app &&

docker run -d -p 5000:80 --network quorum-tessera_quorum_net --name scudo-webapp-prod --rm scudo-app-prod && 
docker run -d -p 80:80 --network quorum-tessera_quorum_net --name proxy --rm nginx-proxy 

#docker run -d -p 4040:4040 --network quorum-tessera_quorum_net  --name ngrok wernight/ngrok ngrok http -host-header=rewrite  scudo-3_proxy_1:80 

#curl $(docker port ngrok 4040)/api/tunnels