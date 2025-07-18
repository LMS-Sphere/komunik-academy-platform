import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Shield, 
  UserCheck, 
  UserX 
} from 'lucide-react';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock users data
  const users = [
    {
      id: 1,
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie.dubois@company.com',
      role: 'learner',
      status: 'active',
      avatar: '/api/placeholder/150/150',
      joinedAt: '2024-11-15',
      lastActivity: '2025-01-06',
      completedModules: 3,
      totalModules: 8,
      averageScore: 87,
      studyTime: 1250,
      certificates: 2
    },
    {
      id: 2,
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'pierre.martin@company.com',
      role: 'trainer',
      status: 'active',
      avatar: '/api/placeholder/150/150',
      joinedAt: '2024-10-20',
      lastActivity: '2025-01-06',
      completedModules: 6,
      totalModules: 8,
      averageScore: 92,
      studyTime: 2180,
      certificates: 4
    },
    {
      id: 3,
      firstName: 'Sophie',
      lastName: 'Laurent',
      email: 'sophie.laurent@company.com',
      role: 'learner',
      status: 'active',
      avatar: '/api/placeholder/150/150',
      joinedAt: '2024-12-01',
      lastActivity: '2025-01-05',
      completedModules: 2,
      totalModules: 8,
      averageScore: 78,
      studyTime: 890,
      certificates: 1
    },
    {
      id: 4,
      firstName: 'Thomas',
      lastName: 'Durand',
      email: 'thomas.durand@company.com',
      role: 'admin',
      status: 'active',
      avatar: '/api/placeholder/150/150',
      joinedAt: '2024-09-10',
      lastActivity: '2025-01-06',
      completedModules: 8,
      totalModules: 8,
      averageScore: 95,
      studyTime: 3200,
      certificates: 6
    },
    {
      id: 5,
      firstName: 'Emma',
      lastName: 'Bernard',
      email: 'emma.bernard@company.com',
      role: 'learner',
      status: 'inactive',
      avatar: '/api/placeholder/150/150',
      joinedAt: '2024-11-30',
      lastActivity: '2024-12-20',
      completedModules: 1,
      totalModules: 8,
      averageScore: 65,
      studyTime: 320,
      certificates: 0
    },
    {
      id: 6,
      firstName: 'Lucas',
      lastName: 'Moreau',
      email: 'lucas.moreau@company.com',
      role: 'trainer',
      status: 'active',
      avatar: '/api/placeholder/150/150',
      joinedAt: '2024-11-01',
      lastActivity: '2025-01-04',
      completedModules: 5,
      totalModules: 8,
      averageScore: 89,
      studyTime: 1980,
      certificates: 3
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    trainerUsers: users.filter(u => u.role === 'trainer').length,
    learnerUsers: users.filter(u => u.role === 'learner').length
  };

  const roleLabels = {
    admin: 'Administrator',
    trainer: 'Trainer',
    learner: 'Learner'
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300',
    trainer: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300',
    learner: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300'
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage user accounts and track their progress
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Administration Center
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Manage your users and analyze their learning performance
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    👥 {stats.totalUsers} users
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    ✅ {stats.activeUsers} active
                  </span>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.adminUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trainers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.trainerUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learners</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.learnerUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Search Users
            </CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              New User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">🛡️ Administrator</SelectItem>
                  <SelectItem value="trainer">📚 Trainer</SelectItem>
                  <SelectItem value="learner">🎓 Learner</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">✅ Active</SelectItem>
                  <SelectItem value="inactive">❌ Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              {/* User Header */}
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-lg font-semibold">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                      {roleLabels[user.role as keyof typeof roleLabels]}
                    </Badge>
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span>{user.completedModules}/{user.totalModules} modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span>{user.certificates} certificates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span>{user.averageScore}% avg score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{formatDuration(user.studyTime)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Module Progress</span>
                    <span className="font-medium">
                      {Math.round((user.completedModules / user.totalModules) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(user.completedModules / user.totalModules) * 100} 
                    className="h-2"
                  />
                </div>

                {/* User Details */}
                <div className="pt-4 border-t text-xs text-gray-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined: {user.joinedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Last activity: {user.lastActivity}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t mt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filterRole !== 'all' || filterStatus !== 'all' 
              ? "Try adjusting your search or filter criteria"
              : "Create your first user to get started"}
          </p>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      )}
    </div>
  );
}