import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, Filter } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { ModuleDetails } from '@/components/modules/ModuleDetails';
import { Module, Level, Progress } from '@/types';

// Mock data - replace with your Laravel API calls
const mockLevels: Level[] = [
  { idLevel: '1', name: 'Débutant', description: 'Niveau débutant', difficulty: 2 },
  { idLevel: '2', name: 'Intermédiaire', description: 'Niveau intermédiaire', difficulty: 5 },
  { idLevel: '3', name: 'Avancé', description: 'Niveau avancé', difficulty: 8 }
];

const mockModules: Module[] = [
  {
    idModule: '1',
    title: 'Introduction à React',
    description: 'Apprenez les bases de React et des composants modernes',
    trainerId: '2',
    lessons: [
      { idLesson: '1', title: 'Introduction', content: '', typeLesson: 'video', moduleId: '1', order: 1 },
      { idLesson: '2', title: 'Composants', content: '', typeLesson: 'pdf', moduleId: '1', order: 2 }
    ],
    level: mockLevels[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idModule: '2',
    title: 'JavaScript Avancé',
    description: 'Concepts avancés de JavaScript pour le développement moderne',
    trainerId: '2',
    lessons: [
      { idLesson: '3', title: 'Closures', content: '', typeLesson: 'video', moduleId: '2', order: 1 },
      { idLesson: '4', title: 'Promises', content: '', typeLesson: 'pdf', moduleId: '2', order: 2 },
      { idLesson: '5', title: 'Async/Await', content: '', typeLesson: 'video', moduleId: '2', order: 3 }
    ],
    level: mockLevels[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idModule: '3',
    title: 'Node.js & Express',
    description: 'Développement backend avec Node.js et Express',
    trainerId: '3',
    lessons: [
      { idLesson: '6', title: 'Setup Node.js', content: '', typeLesson: 'pdf', moduleId: '3', order: 1 },
      { idLesson: '7', title: 'Routes Express', content: '', typeLesson: 'video', moduleId: '3', order: 2 }
    ],
    level: mockLevels[2],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockProgress: Progress[] = [
  {
    idProgress: '1',
    progress: 75,
    speed: 1.2,
    timePassed: 3600,
    userId: '1',
    moduleId: '1',
    startedAt: new Date(),
    lastAccessed: new Date()
  }
];

export default function Courses() {
  const { currentUser, canCreateModule, hasRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const filteredModules = mockModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || module.level.idLevel === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getUserProgress = (moduleId: string) => {
    return mockProgress.find(p => p.moduleId === moduleId && p.userId === currentUser?.id);
  };

  const handleEditModule = (module: Module) => {
    console.log('Edit module:', module);
    // TODO: Open edit modal or navigate to edit page
  };

  const handleDeleteModule = (moduleId: string) => {
    console.log('Delete module:', moduleId);
    // TODO: Show confirmation dialog and delete module
  };

  const handleStartModule = (moduleId: string) => {
    const module = mockModules.find(m => m.idModule === moduleId);
    if (module) {
      setSelectedModule(module);
    }
  };

  const handleCreateModule = () => {
    console.log('Create new module');
    // TODO: Open create module modal or navigate to create page
  };

  const getPageTitle = () => {
    switch (currentUser?.role) {
      case 'admin':
        return 'Gestion des Modules';
      case 'trainer':
        return 'Mes Modules de Formation';
      case 'learner':
        return 'Mes Cours';
      default:
        return 'Modules';
    }
  };

  const getPageDescription = () => {
    switch (currentUser?.role) {
      case 'admin':
        return 'Gérez tous les modules de formation de la plateforme';
      case 'trainer':
        return 'Créez et gérez vos modules de formation';
      case 'learner':
        return 'Découvrez et suivez vos cours en ligne';
      default:
        return 'Explorez les modules disponibles';
    }
  };

  // If a module is selected, show module details
  if (selectedModule) {
    return (
      <div className="p-8">
        <ModuleDetails 
          module={selectedModule} 
          onBack={() => setSelectedModule(null)} 
        />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{getPageTitle()}</h1>
          <p className="text-muted-foreground text-lg">
            {getPageDescription()}
          </p>
        </div>
        {canCreateModule() && (
          <Button 
            className="bg-gradient-primary hover:bg-primary-hover"
            onClick={handleCreateModule}
          >
            <Plus className="mr-2 h-4 w-4" />
            Créer un Module
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher des modules..."
            className="pl-10 bg-muted/50 border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={selectedLevel === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedLevel('all')}
            className="text-sm"
          >
            <Filter className="mr-2 h-4 w-4" />
            Tous les niveaux
          </Button>
          {mockLevels.map((level) => (
            <Button
              key={level.idLevel}
              variant={selectedLevel === level.idLevel ? 'default' : 'outline'}
              onClick={() => setSelectedLevel(level.idLevel)}
              className="text-sm"
            >
              {level.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <ModuleCard
            key={module.idModule}
            module={module}
            progress={getUserProgress(module.idModule)}
            onEdit={handleEditModule}
            onDelete={handleDeleteModule}
            onStart={handleStartModule}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            {searchTerm ? 'Aucun module trouvé' : 'Aucun module disponible'}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {searchTerm 
              ? 'Essayez avec d\'autres mots-clés de recherche'
              : canCreateModule() 
                ? 'Commencez par créer votre premier module'
                : 'Les modules seront bientôt disponibles'
            }
          </p>
          {canCreateModule() && !searchTerm && (
            <Button 
              className="mt-4 bg-gradient-primary hover:bg-primary-hover"
              onClick={handleCreateModule}
            >
              <Plus className="mr-2 h-4 w-4" />
              Créer un Module
            </Button>
          )}
        </div>
      )}
    </div>
  );
}