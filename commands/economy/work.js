module.exports = {
  name: "work",
  description: "Work and earn coins",
  run: async (client, message, args) => {
    
    const user = await client.getUser(message.author.id);

    const jobs = [
    'Developer', 
    'Doctor',
    'Nurse',
    'Engineer',
    'Cashier',
    'Shopkeeper', 
    'YouTuber',
    'Game Developer', 
    'Astronaut', 
    'Fishermen', 
    'Chef',
    'Chief',
    'President',
    'Lawyer',
    'Movie Director',
    'Mechanic',
    'Carpenter',
    'Guard',
    'Police',
    'Military Army',
    'Application Developer',
    'Teacher',
    'Principal',
    'Artist'
    ];
    
    let job = Math.floor((Math.random() * jobs.length));
    let earned = Math.floor(Math.random() * 50 + 20 - 10 + 5 - 1 + 3) + 1;
    
    let work = new client.embed()
    .setDescription(`You worked as a \`${jobs[job]}\` and earned **${earned}** coins!`)
    .setColor(client.config.embedColor.toUpperCase());
    message.channel.send(work).then(await client.updateCoins(message.author.id, earned));
    
      module.exports = jobs;
 }
}