"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Lock, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-gray-400">Manage your account settings</p>
          </div>
        </div>
        <GradientButton onClick={() => setIsEditing(!isEditing)}>
          <Edit2 className="w-4 h-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </GradientButton>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <div className="flex flex-col items-center p-6">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-white">John Doe</h2>
              <p className="text-gray-400">john.doe@example.com</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Account Details
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">john.doe@example.com</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-300">Password: ********</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Personal Information
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      readOnly={!isEditing}
                      className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      readOnly={!isEditing}
                      className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    readOnly={!isEditing}
                    className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    readOnly={!isEditing}
                    className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {isEditing && (
                  <GradientButton type="submit">Save Changes</GradientButton>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
