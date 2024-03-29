import { type ClassValue, clsx } from "clsx";
import { Slide, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const constants = {
  navLinks: [
    {
      title: "Home",
      path: "/",
      smHidden: false,
      icon: "/assets/house-solid.svg",
    },
    { title: "About", path: "/about", smHidden: true, icon: null },
    {
      title: "Gallery",
      path: "/gallery",
      smHidden: false,
      icon: null,
    },
    {
      title: "Articles",
      path: "/articles",
      smHidden: false,
      icon: "/assets/newspaper-solid.svg",
    },
    {
      title: "Contact",
      path: "/contact",
      smHidden: false,
      icon: "/assets/headset-solid.svg",
    },
    {
      title: "Rides",
      path: "/rides",
      smHidden: false,
      icon: "/assets/flag-solid.svg",
    },
  ],
  tables: {
    users: "vikinx_users",
    rides: "rides",
  },
  whyUsPoints: [
    {
      title: "Experience the Unmatched",
      content:
        "With VikinX, every turn brings a new horizon, every ride is a story, and every rider is a friend you haven’t met yet.",
    },
    {
      title: "Safety in Numbers",
      content:
        "Ride with the assurance of safety, as we provide state-of-the-art tech and a community that looks out for each other.",
    },
    {
      title: "Exclusive Access",
      content:
        "Be among the elite ‘VikinX Originals’ and enjoy early access to features, bespoke merchandise, and privileges that elevate your riding status.",
    },
    {
      title: "Community and Connection",
      content:
        "Forge lasting bonds over shared miles. Our platform is your gateway to a fraternity of riders who share your passion and zest for life on two wheels.",
    },
    {
      title: "Innovation at Your Fingertips",
      content:
        "We’re not just about rides; we’re about revolutionizing riding. Get the latest updates, tips, and tech that keep you ahead of the curve.",
    },
  ],
  values: [
    {
      title: "Passion for Riding",
      content:
        "We are committed to fostering a culture that celebrates the love for riding and the spirit of adventure.",
    },
    {
      title: "Safety",
      content:
        "We prioritize the safety of our riders, providing them with the tools and information they need to enjoy their rides safely.",
    },
    {
      title: "Community",
      content:
        "We believe in the power of community and strive to create a space where riders can connect, share, and learn from each other. ",
    },
    {
      title: "Integrity",
      content:
        "We operate with integrity, ensuring transparency and honesty in all our interactions.",
    },
    {
      title: "Innovation",
      content:
        "We are dedicated to continuous learning and innovation, always seeking to improve our platform and services to better serve our riders.",
    },
  ],
};

export const helpers = {
  toastify: (
    message: string,
    type?: "info" | "success" | "warning" | "error"
  ) => {
    switch (type) {
      case "error":
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        break;
      case "info":
        toast.info(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        break;
      case "success":
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        break;
      default:
        toast(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        break;
    }
  },

  formatDate: (date: any) => moment(date).format("DD MMMM YYYY"),
};

export const facts = [
  {
    fact: "In India's close-knit biking community, riders share an identity deeper than career designations or social status. Bank managers ride alongside college students, software engineers band with farmers - the biking brotherhood equalizes all.",
    source: "mensxp",
  },
  {
    fact: "Four million riders tread India's roads, braving ruts and red lights as brothers-in-arms. But no obstacle diminishes the tenacious fraternity and grit of the world's largest motorbike owners.",
    source: "mensxp",
  },
  {
    fact: "The first recorded motorcycle races in India took place in the 1920s on makeshift dirt tracks on the outskirts of cities like Delhi, Mumbai, and Chennai. Riders raced on classic British motorcycles like BSA, Norton, and Royal Enfield in these modest competitions organized by local clubs.",
    source: "mensxp",
  },
  {
    fact: "In the early 2000s, only a handful of racing circuits existed in India. But thanks to private investments worth over ₹1200 crores, India now houses 11 international-level circuits across Tamil Nadu, Maharashtra, Bengaluru, Coimbatore, Hyderabad, and the newly built Noida Racing Circuit.",
    source: "mensxp",
  },
  {
    fact: "Did you know that the motorcycle was first referred to as a ‘Petrol Bicycle’? It was only in 1894 when a German company called Hildebrand & Wolfmuller became the first to commercially manufacture the two-wheeler. The company referred to the vehicle as ‘motorrad’ (in German), which directly translates to motorcycle.",
    source: "directasia",
  },
  {
    fact: "Helmet use for motorcycle riders was mandated after Colonel T.E. Lawrence died in a motorcycle accident.",
    source: "directasia",
  },
  {
    fact: "Emilio Scotto is an Argentine adventurer, photojournalist, and writer. As of 2009, he holds the Guinness record for the world's longest motorcycle ride, spanning 10 years, 232 countries and a total distance of 457,000 miles (735,000 km). He rode on the “Black Princess” a 1980 Honda GoldWing GL1100 motorcycle.",
    source: "directasia",
  },
  {
    fact: "Kawasaki started up in 1878 in the shipbuilding industry. They made their first motorcycle in 1962. Today Kawasaki Heavy Industries make aeroplanes, helicopters, trains, ships, industrial robots, missiles, spacecraft, jet skis, and of course motorcycles.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "Royal Enfield started making motorcycles in 1901, and are the oldest brand still in production today, with the Bullet model having the longest production run of all time.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "Ducati started up in 1935 making radio parts.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "The longest ever backwards motorcycle ride was achieved by Dipayan Choudhury in India in 2017. He covered 125.52 miles (202 Kilometers). He was facing backwards, the motorcycle was going forwards. To achieve that in India is a miracle, but probably less frightening than seeing what is going on in front of you.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "The world’s longest motorcycle was built by Bharat Sinh Parmar in India in 2015. It is 86 feet 3 inches long. It’s a bit ridiculous. If he’s still got it he should try riding it backwards.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "The term motorcycle was first used by British inventor Edward Butler in 1884 who was building a three-wheeled petrol vehicle.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "The first-ever motorcycle, or rather motorised bicycle with an internal combustion engine, was made by Gottlieb Daimler and Wilhelm Maybach in Germany in 1885. It had a wooden frame and a gas-powered engine. It was destroyed in a fire in 1903.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "In 1997 Honda launched the CBR1100XX Blackbird. It was very fast. In 1999 Suzuki launched the GSX1300R Hayabusa. It was even faster. The English translation of Hayabusa is Peregrine falcon, and Peregrine falcons eat Blackbirds. In a dive, a Peregrine falcon has about the same top speed as a Hayabusa.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "The fastest production motorcycle to date is the Kawasaki Ninja H2R. It is a track-only bike that achieved 249 mph in 2016.",
    source: "motorcyclepartswarehouse",
  },
  {
    fact: "On average, motorcyclists are happier than the average motorist. The study uncovered the therapeutic potential of motorcycle riding, with 82 percent of riders agreeing that riding makes them happy — compared to only around 55 per cent of motorists.",
    source: "economictimes",
  },
  {
    fact: "Harley Davidson motorcycles have a failure rate over twice that of the top three motorcycle manufacturers in the world.",
    source: "kickassfacts",
  },
  {
    fact: "In 2003 Dodge built and sold nine motorcycles with a viper V-10 engine called the Dodge Tomahawk.",
    source: "kickassfacts",
  },
  {
    fact: `In Motorcycle Road Racing (i.e. Isle of Man TT) the paramedics ride superbikes too, following the racers, to be as fast as possible on the crash scene.`,
    source: "streetrider",
  },
  {
    fact: `The first-ever Harley Davidson motorcycle only went 40km/h. It had a single-cylinder engine that actually used a tomato can as its carburetor.`,
    source: "streetrider",
  },
  {
    fact: `Horses were used as a method of transportation for messengers during World War 1 but were soon overtaken by the use of motorcycles.`,
    source: "streetrider",
  },
  {
    fact: "The use of a helmet was authorized following Colonel T.E. Lawrence of Arabia’s death. He was killed in a motorcycle accident after he swerved to avoid two young boys riding on their bicycles.",
    source: "kickassfacts",
  },
  {
    fact: "There is a long gap in time between the invention of the motorcycle and the first backflip on a motorcycle, and then there is the invention of flight and us landing on the moon.",
    source: "kickassfacts",
  },
  {
    fact: "Motorcyclists are almost 30X more likely to die than other motorists. So be safe and always wear safety gears.",
    source: "VikinX",
  },
];

export const stories = [
  {
    name: "Asher K",
    quote:
      "The experience was very chilling and breathtaking. Enjoyed every moment of it with other like-minded bikers. Love being part of this amazing community. Looking forward for more such adventures.",
  },
  {
    name: "Rajesh Lokhande",
    quote:
      "What a ride! The Lonavla trip with VikinX was epic. The people, breakfast and the experience were just perfect. Plus, the cool merch made us all feel like part of a special club. Can’t wait for the next one!",
  },
  {
    name: "Abdullah Khot",
    quote: "AMAZING RIDE IT WAS . WAITING FOR ANOTHER.",
  },
  {
    name: "MOHAMMAD SAMI",
    quote:
      "Recently had the thrill of a lifetime biking from Kalamboli to Lonavala, and I must say, it was an exhilarating experience! The scenic route, coupled with the adrenaline rush of the ride, made it an unforgettable journey. The team-up with my biking buddies added to the excitement, making it even more enjoyable. I would rate this adventure a solid 4 out of 5 stars. Can't wait for the next thrilling ride",
  },
  {
    name: "Naved Qureshi",
    quote:
      "My first experience with your community was amazing. I felt welcomed and excited to ride alongside fellow enthusiasts. Together, we shared stories, discovered new routes, and formed lasting friendships. Joining your community wasn't just about riding; it was about becoming part of a supportive family bonded by our love for adventure on the open road.",
  },
  {
    name: "Mohsin S",
    quote: `My first experience riding with VikinX was exhilarating! As we geared up for our adventure, the anticipation was palpable. Riding alongside my college friends, each of us adorned with our clan insignia, felt like being part of an epic journey. 
    We navigated winding roads and scenic routes, sharing laughter, stories, and occasional friendly competition. It was more than just a ride; it was a bonding experience that forged lasting memories and strengthened our friendship.
    The first ride with VikinX set the tone for many more memorable adventures to come.`,
  },
  {
    name: "Sawant Z",
    quote: `I just went on my first bike ride, and it was awesome! It's so cool how people who love to travel get together for these rides. I really want you guys to join us and become part of the VikinX family.`,
  },
  {
    name: "Saif Hamdare",
    quote: `Riding with a group was an amazing experience! Having fellow riders around made the journey joyful and added a sense of safety. Can't wait to join the next ride soon!`,
  },
];
