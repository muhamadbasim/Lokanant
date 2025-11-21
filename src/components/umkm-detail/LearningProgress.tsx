import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, PlayCircle } from "lucide-react";

interface Course {
  name: string;
  progress: number;
  completed: boolean;
  certificateUrl?: string;
}

interface LearningProgressProps {
  courses: Course[];
}

export const LearningProgress = ({ courses }: LearningProgressProps) => {
  const completedCourses = courses.filter(c => c.completed).length;
  const totalProgress = Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-card border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Kursus</p>
              <p className="text-3xl font-bold text-primary">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-card border border-success/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Selesai</p>
              <p className="text-3xl font-bold text-success">{completedCourses}</p>
            </div>
            <Award className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-6 bg-card border border-warning/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progress Keseluruhan</p>
              <p className="text-3xl font-bold text-warning">{totalProgress}%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-card bg-card border border-border">
        <h3 className="text-xl font-bold text-foreground mb-6">Daftar Kursus</h3>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <Card key={index} className="p-5 bg-card border border-border hover:shadow-card transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    {course.name}
                    {course.completed && (
                      <Badge className="bg-success text-success-foreground">
                        <Award className="w-3 h-3 mr-1" />
                        Selesai
                      </Badge>
                    )}
                  </h4>
                  <div className="flex items-center gap-3">
                    <Progress value={course.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold text-foreground min-w-[45px]">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {course.completed ? (
                  course.certificateUrl ? (
                    <Button size="sm" variant="outline">
                      <Award className="w-4 h-4 mr-2" />
                      Lihat Sertifikat
                    </Button>
                  ) : null
                ) : (
                  <Button size="sm" variant="default">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Lanjutkan
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-card bg-gradient-primary text-white">
        <h3 className="text-xl font-bold mb-2">Rekomendasi Kursus Berikutnya</h3>
        <p className="text-sm opacity-90 mb-4">
          Tingkatkan kemampuan bisnis Anda dengan kursus yang disesuaikan dengan kategori usaha
        </p>
        <Button variant="secondary">
          Jelajahi Kursus
        </Button>
      </Card>
    </div>
  );
};
