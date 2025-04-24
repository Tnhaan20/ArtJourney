import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Import images from assets (assuming they're organized there)
import { assets } from '@/assets/assets';
import { TailwindStyle } from '@/utils/Enum';

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');
  const [activePeriods, setActivePeriods] = useState({});

  // Course data structure
  const regions = [
    {
      id: 'europe',
      name: 'Europe Art History',
      periods: ['Prehistoric', 'Ancient', 'Medieval', 'Renaissance', 'Modern', 'Postmodern & Contemporary'],
      courses: [
        {
          id: 'lascaux-cave-art',
          title: 'Lascaux Cave Art',
          image: assets.courses.europe.lascauxCaveArt || 'https://via.placeholder.com/300x200?text=Lascaux+Cave+Art',
          period: 'Prehistoric'
        },
        {
          id: 'lion-man-sculpture',
          title: 'Lion-Man sculpture',
          image: assets.courses.europe.lionManSculpture || 'https://via.placeholder.com/300x200?text=Lion-Man+Sculpture',
          period: 'Ancient'
        },
        {
          id: 'altamira-cave-art',
          title: 'Altamira cave art',
          image: assets.courses.europe.altamiraCaveArt || 'https://via.placeholder.com/300x200?text=Altamira+Cave+Art',
          period: 'Prehistoric'
        }
      ]
    },
    {
      id: 'asia',
      name: 'Asia Art History',
      periods: ['Prehistoric', 'Ancient', 'Medieval', 'Early Modern', 'Modern', 'Postmodern & Contemporary'],
      courses: [
        {
          id: 'bhimbetka-rock-art',
          title: 'Bhimbetka Rock Art',
          image: assets.courses.asia.bhimbetkaRockArt || 'https://via.placeholder.com/300x200?text=Bhimbetka+Rock+Art',
          period: 'Prehistoric'
        },
        {
          id: 'leang-karampuang-art',
          title: 'Leang Karampuang Art',
          image: assets.courses.asia.leangKarampuangArt || 'https://via.placeholder.com/300x200?text=Leang+Karampuang+Art',
          period: 'Ancient'
        },
        {
          id: 'dogu-spiritual-symbol',
          title: 'Dogu Spiritual Symbol',
          image: assets.courses.asia.doguSpiritualSymbol || 'https://via.placeholder.com/300x200?text=Dogu+Spiritual+Symbol',
          period: 'Ancient'
        }
      ]
    },
    {
      id: 'africa',
      name: 'Africa Art History',
      periods: ['Prehistoric', 'Ancient', 'Medieval', 'Colonial', 'Modern', 'Postmodern & Contemporary'],
      courses: [
        {
          id: 'tassili-najjer-rock-art',
          title: 'Tassili n\'Ajjer Rock Art',
          image: assets.courses.africa.tassiliRockArt || 'https://via.placeholder.com/300x200?text=Tassili+Rock+Art',
          period: 'Prehistoric'
        },
        {
          id: 'tadrart-acacus-art',
          title: 'Tadrart Acacus Art',
          image: assets.courses.africa.tadrartAcacusArt || 'https://via.placeholder.com/300x200?text=Tadrart+Acacus+Art',
          period: 'Ancient'
        },
        {
          id: 'twyfelfontein-rock-engravings',
          title: 'Twyfelfontein: Rock Engravings',
          image: assets.courses.africa.twyfelRockEngravings || 'https://via.placeholder.com/300x200?text=Twyfelfontein+Engravings',
          period: 'Prehistoric'
        }
      ]
    },
    {
      id: 'oceania',
      name: 'Oceania Art History',
      periods: ['Prehistoric', 'Ancient', 'Medieval', 'Colonial', 'Modern', 'Postmodern & Contemporary'],
      courses: [
        {
          id: 'gwion-kimberley-art',
          title: 'Gwion Kimberley Art',
          image: assets.courses.oceania.gwionKimberleyArt || 'https://via.placeholder.com/300x200?text=Gwion+Kimberley+Art',
          period: 'Prehistoric'
        },
        {
          id: 'ubirr-kakadu-stories',
          title: 'Ubirr Kakadu Stories',
          image: assets.courses.oceania.ubirrKakaduStories || 'https://via.placeholder.com/300x200?text=Ubirr+Kakadu+Stories',
          period: 'Ancient'
        },
        {
          id: 'murujuga-ancient-carvings',
          title: 'Murujuga Ancient Carvings',
          image: assets.courses.oceania.murujugaCarvings || 'https://via.placeholder.com/300x200?text=Murujuga+Carvings',
          period: 'Ancient'
        }
      ]
    },
    {
      id: 'north-america',
      name: 'North America Art History',
      periods: ['Pre-Columbian', 'Colonial Period', 'Post-Colonial Period', 'Modern', 'Postmodern & Contemporary'],
      courses: [
        {
          id: 'pyramid-sun-teotihuacan',
          title: 'Pyramid Sun: Teotihuacan',
          image: assets.courses.namerica.pyramidSunTeotihuacan || 'https://via.placeholder.com/300x200?text=Pyramid+of+the+Sun',
          period: 'Pre-Columbian'
        },
        {
          id: 'la-venta-olmec-rituals',
          title: 'La Venta: Olmec Rituals',
          image: assets.courses.namerica.laVentaOlmec || 'https://via.placeholder.com/300x200?text=La+Venta+Olmec',
          period: 'Pre-Columbian'
        },
        {
          id: 'xiuhteculhtli-mask-aztec-fire',
          title: 'Xiuhteculhtli Mask: Aztec Fire',
          image: assets.courses.namerica.xiuhteculhtliMask || 'https://via.placeholder.com/300x200?text=Xiuhteculhtli+Mask',
          period: 'Pre-Columbian'
        }
      ]
    },
    {
      id: 'south-america',
      name: 'South America Art History',
      periods: ['Pre-Columbian', 'Colonial', 'Post-Colonial', 'Modern', 'Postmodern & Contemporary'],
      courses: [
        {
          id: 'machu-picchu-inca',
          title: 'Machu Picchu Inca',
          image: assets.courses.samerica.machuPicchuInca || 'https://via.placeholder.com/300x200?text=Machu+Picchu',
          period: 'Pre-Columbian'
        },
        {
          id: 'moche-art-power',
          title: 'Moche Art Power',
          image: assets.courses.samerica.mocheArtPower || 'https://via.placeholder.com/300x200?text=Moche+Art',
          period: 'Pre-Columbian'
        },
        {
          id: 'sican-death-mask',
          title: 'Sican Death Mask',
          image: assets.courses.samerica.sicanDeathMask || 'https://via.placeholder.com/300x200?text=Sican+Death+Mask',
          period: 'Pre-Columbian'
        }
      ]
    }
  ];

  // Filter courses based on search term
  const filteredRegions = regions.filter(region => 
    activeRegion === 'all' || region.id === activeRegion
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const togglePeriod = (regionId, period) => {
    setActivePeriods(prev => {
      const regionPeriods = prev[regionId] || [];
      if (regionPeriods.includes(period)) {
        return {
          ...prev,
          [regionId]: regionPeriods.filter(p => p !== period)
        };
      } else {
        return {
          ...prev,
          [regionId]: [...regionPeriods, period]
        };
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">COURSES</h1>
      
      {/* Search bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-4 pr-10 rounded-md bg-gray-100 border-none focus:ring-2 focus:ring-primary-yellow"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={20} />
        </div>
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-md ${activeRegion === 'all' ? 'bg-primary-yellow text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveRegion('all')}
        >
          All Regions
        </button>
        {regions.map(region => (
          <button
            key={region.id}
            className={`px-4 py-2 rounded-md ${activeRegion === region.id ? 'bg-primary-yellow text-white' : 'bg-gray-100'}`}
            onClick={() => setActiveRegion(region.id)}
          >
            {region.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Course listings by region */}
      <div className="space-y-16">
        {filteredRegions.map(region => {
          // Filter courses by search term if one exists
          const filteredCourses = searchTerm 
            ? region.courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.period.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : region.courses;

          // Filter by active periods if any are selected
          const regionActivePeriods = activePeriods[region.id] || [];
          const periodFilteredCourses = regionActivePeriods.length > 0
            ? filteredCourses.filter(course => regionActivePeriods.includes(course.period))
            : filteredCourses;

          // Only show regions with matching courses when searching
          if ((searchTerm || regionActivePeriods.length > 0) && periodFilteredCourses.length === 0) return null;

          return (
            <div key={region.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{region.name}</h2>
              
              {/* Period filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {region.periods.map(period => {
                  const isActive = (activePeriods[region.id] || []).includes(period);
                  return (
                    <span 
                      key={period} 
                      className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ${
                        isActive ? TailwindStyle.HIGHLIGHT_FRAME : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => togglePeriod(region.id, period)}
                    >
                      {period}
                    </span>
                  );
                })}
              </div>
              
              {/* Course cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {periodFilteredCourses.map(course => (
                  <Link 
                    to={`/learn/course/${course.id}`} 
                    key={course.id}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 bg-[#f8e7ce]">
                        <h3 className="font-medium text-lg">{course.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}