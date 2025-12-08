"use client";

import { IUser, IUserRole } from "@/types/user.interface";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Phone, Users, Globe, User } from "lucide-react";

interface ProfileViewProps {
  user: IUser;
}

export default function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="grid xl:gap-6 lg:gap-3 md:gap-4 gap-3 lg:grid-cols-3">
      {/* Left Column: User Info Card */}
      <Card className="lg:col-span-1 h-fit">
        <CardHeader className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={user?.profilePhoto || "https://github.com/shadcn.png"}
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-background shadow-sm"
            />
          </div>
          <h2 className="text-xl font-bold text-center">{user?.fullname}</h2>
          <p className="text-muted-foreground text-sm text-center">
            {user?.email}
          </p>
          <div className="mt-2 text-center">
            <Badge variant="secondary" className="uppercase text-xs">
              {user?.role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <EditProfileModal user={user} />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm border-t pt-4">
            <div className="flex flex-col">
              <span className="font-bold">
                {user?.myFollowers?.length || 0}
              </span>
              <span className="text-muted-foreground text-xs">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">
                {user?.myFollowings?.length || 0}
              </span>
              <span className="text-muted-foreground text-xs">Following</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{user?.totalProfileViews || 0}</span>
              <span className="text-muted-foreground text-xs">Views</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t text-sm">
            {user?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user.phone}</span>
              </div>
            )}
            {user?.currentLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>
                  {user.currentLocation.city}, {user.currentLocation.country}
                </span>
              </div>
            )}
            {user?.gender && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="capitalize">{user.gender.toLowerCase()}</span>
              </div>
            )}
            {user?.age && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{user.age} years old</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>
                Member since{" "}
                {new Date(user?.createdAt as Date).toLocaleDateString() ||
                  new Date().toLocaleDateString()}
                {/* {new Date(user?.createdAt || Date.now()).toLocaleDateString()} */}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Details & Content */}
      <div className="lg:col-span-2 xl:space-y-6 lg:space-y-3 md:space-y-4 space-y-3">
        {/* About Me */}
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            {user?.bio ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {user.bio}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No bio added yet.
              </p>
            )}
          </CardContent>
        </Card>

        {user?.role === IUserRole.USER && (
          <>
            {/* Visited Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Visited Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user?.visitedCountries && user.visitedCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.visitedCountries.map((country, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {country}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No countries visited yet.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Travel Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Interests</CardTitle>
              </CardHeader>
              <CardContent>
                {user?.travelInterests && user.travelInterests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.travelInterests.map(
                      (interest: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {interest}
                        </Badge>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No interests added.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Verified Status & Subscription */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
              <span className="text-sm font-medium">Verification Status</span>
              <Badge variant={user?.isVerified ? "default" : "destructive"}>
                {user?.isVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            {user?.role === IUserRole.USER && user?.subscriptionInfo && (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                <span className="text-sm font-medium">Subscription Plan</span>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-primary">
                    {user.subscriptionInfo.plan || "Free"}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {user.subscriptionInfo.status}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
