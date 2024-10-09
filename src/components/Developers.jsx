import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const developersData = [
  {
    id: 1,
    name: 'Magdy Abo El-nour',
    title: 'Frontend Developer',
    description: 'Specialized in building responsive and dynamic web applications.',
    country: 'EG',
    state: 'Beheira',
    linkedin: 'https://www.linkedin.com/in/magdy-abo-el-nour-672997322/',
    github: 'https://github.com/magdy246',
    whatsapp: 'https://wa.me/201276010396',
  },
  {
    id: 2,
    name: 'Mohamed Hessein',
    title: 'Frontend Developer',
    description: 'Focused on creating seamless user experiences with modern frameworks.',
    country: 'EG',
    state: 'Assiut',
    linkedin: 'https://www.linkedin.com/in/mohammed-hussein-54590a30a/',
    github: 'https://github.com/MohammedHussein1999',
    whatsapp: 'https://wa.me/201040479006',
  },
  {
    id: 3,
    name: 'Ahmed Ashraf',
    title: 'Frontend Developer',
    description: 'Expert in HTML, CSS, and JavaScript to deliver beautiful web interfaces.',
    country: 'EG',
    state: 'Qena',
    linkedin: 'http://www.linkedin.com/in/ahmed-ashraf-849bbb1b9',
    github: 'https://github.com/AhmedAshraf2288',
    whatsapp: 'https://wa.me/201011340330',
  },
  {
    id: 4,
    name: 'Khaled Ahmed',
    title: 'Frontend Developer',
    description: 'Passionate about building accessible and performant web applications.',
    country: 'EG',
    state: 'Kafr El-Sheikh',
    linkedin: 'https://www.linkedin.com/in/khaled-ahmed-317962203/',
    github: 'https://github.com/khaledas90',
    whatsapp: 'https://wa.me/201090898650',
  },
  {
    id: 5,
    name: 'Boula Nessim',
    title: 'Backend Developer',
    description: 'Specialized in server-side programming and database management.',
    country: 'EG',
    state: 'Giza',
    linkedin: 'https://www.linkedin.com/in/boula-nessim',
    github: 'https://github.com/boula1997',
    whatsapp: 'https://wa.me/201126785910',
  },
];

const DeveloperCard = ({ name, title, description, country, state, linkedin, github, whatsapp }) => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 hover:shadow-gray-400 hover:shadow-xl transition-all duration-500 m-4">
    <div className="px-6 py-4">
      <div className="font-bold text-3xl mb-2 text-gray-900 hover:underline">{name}</div>
      <p className="text-gray-600 text-lg">{title}</p>
      <p className="text-gray-700 mt-2">{description}</p>
      <p className="text-gray-500 text-sm mt-2">{`${country}, ${state}`}</p>
    </div>
    <div className="px-6 py-4 flex justify-around">
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-500 transition-colors duration-200">
        <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
        LinkedIn
      </a>
      <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-500 transition-colors duration-200">
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        GitHub
      </a>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-500 transition-colors duration-200">
        <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
        WhatsApp
      </a>
    </div>
  </div>

);

const Developers = () => {
  return (
    <>
      <div className="h-full bg-gray-100 py-8 mb-1" dir='ltr'>
        <h1 className="text-center text-6xl font-bold text-white my-6 relative">
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Meet Our Developers</span>
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
        </h1>
        <div className="flex flex-wrap justify-center">
          {developersData.map((dev) => (
            <DeveloperCard
              key={dev.id}
              name={dev.name}
              title={dev.title}
              description={dev.description}
              country={dev.country}
              state={dev.state}
              linkedin={dev.linkedin}
              github={dev.github}
              whatsapp={dev.whatsapp}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Developers;
