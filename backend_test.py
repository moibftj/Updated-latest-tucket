#!/usr/bin/env python3
"""
Tucker Trips Backend API Test Suite - Profile Settings & Live Chat
Tests Profile Management, Online User Tracking, and Live Chat Messaging
"""

import requests
import json
import sys
import time
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://journey-notes-3.preview.emergentagent.com/api"

class TuckerTripsBackendTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.alice_token = None
        self.bob_token = None
        self.alice_id = None
        self.bob_id = None
        
    def log(self, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {message}")

    def test_user_registration_and_login(self):
        """Test user registration and login for Alice and Bob"""
        self.log("=== Testing User Registration and Login ===")
        
        # Register Alice
        alice_data = {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "password": "SecurePass123!"
        }
        
        try:
            response = requests.post(f"{self.base_url}/auth/register", json=alice_data)
            if response.status_code == 200:
                alice_result = response.json()
                self.alice_token = alice_result['token']
                self.alice_id = alice_result['user']['id']
                self.log(f"✅ Alice registered successfully - ID: {self.alice_id}")
            else:
                self.log(f"❌ Alice registration failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Alice registration error: {str(e)}")
            return False
            
        # Register Bob
        bob_data = {
            "name": "Bob Smith",
            "email": "bob.smith@example.com", 
            "password": "SecurePass456!"
        }
        
        try:
            response = requests.post(f"{self.base_url}/auth/register", json=bob_data)
            if response.status_code == 200:
                bob_result = response.json()
                self.bob_token = bob_result['token']
                self.bob_id = bob_result['user']['id']
                self.log(f"✅ Bob registered successfully - ID: {self.bob_id}")
            else:
                self.log(f"❌ Bob registration failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Bob registration error: {str(e)}")
            return False
            
        return True

    def test_profile_management(self):
        """Test PATCH /api/users/profile - Update user name and bio"""
        self.log("=== Testing Profile Management ===")
        
        # Test Alice updating her profile with bio
        alice_headers = {"Authorization": f"Bearer {self.alice_token}"}
        profile_update = {
            "name": "Alice Johnson (Travel Enthusiast)",
            "bio": "Love exploring new destinations and sharing travel tips! Currently planning trips to Japan and Iceland. Always looking for hidden gems and local experiences."
        }
        
        try:
            response = requests.patch(f"{self.base_url}/users/profile", 
                                    json=profile_update, headers=alice_headers)
            if response.status_code == 200:
                result = response.json()
                user = result['user']
                if user['name'] == profile_update['name'] and user['bio'] == profile_update['bio']:
                    self.log("✅ Alice profile update successful - name and bio updated correctly")
                else:
                    self.log(f"❌ Profile data mismatch - Expected: {profile_update}, Got: {user}")
                    return False
            else:
                self.log(f"❌ Alice profile update failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Alice profile update error: {str(e)}")
            return False
            
        # Test Bob updating just his bio
        bob_headers = {"Authorization": f"Bearer {self.bob_token}"}
        bio_update = {
            "bio": "Adventure seeker and photography lover. Documenting my journeys around the world. Next stop: New Zealand!"
        }
        
        try:
            response = requests.patch(f"{self.base_url}/users/profile", 
                                    json=bio_update, headers=bob_headers)
            if response.status_code == 200:
                result = response.json()
                user = result['user']
                if user['bio'] == bio_update['bio'] and user['name'] == "Bob Smith":
                    self.log("✅ Bob bio update successful - bio updated, name preserved")
                else:
                    self.log(f"❌ Bob profile data mismatch - Expected bio: {bio_update['bio']}, Got: {user}")
                    return False
            else:
                self.log(f"❌ Bob bio update failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Bob bio update error: {str(e)}")
            return False
            
        # Test various bio lengths
        long_bio = "A" * 500  # Test with long bio
        long_bio_update = {"bio": long_bio}
        
        try:
            response = requests.patch(f"{self.base_url}/users/profile", 
                                    json=long_bio_update, headers=alice_headers)
            if response.status_code == 200:
                result = response.json()
                if result['user']['bio'] == long_bio:
                    self.log("✅ Long bio (500 chars) handled correctly")
                else:
                    self.log("❌ Long bio not saved correctly")
                    return False
            else:
                self.log(f"❌ Long bio update failed: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Long bio update error: {str(e)}")
            return False
            
        return True

    def test_heartbeat_system(self):
        """Test POST /api/users/heartbeat - Send heartbeat to mark user online"""
        self.log("=== Testing Heartbeat System ===")
        
        # Alice sends heartbeat
        alice_headers = {"Authorization": f"Bearer {self.alice_token}"}
        try:
            response = requests.post(f"{self.base_url}/users/heartbeat", headers=alice_headers)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log("✅ Alice heartbeat sent successfully")
                else:
                    self.log(f"❌ Alice heartbeat response invalid: {result}")
                    return False
            else:
                self.log(f"❌ Alice heartbeat failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Alice heartbeat error: {str(e)}")
            return False
            
        # Bob sends heartbeat
        bob_headers = {"Authorization": f"Bearer {self.bob_token}"}
        try:
            response = requests.post(f"{self.base_url}/users/heartbeat", headers=bob_headers)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log("✅ Bob heartbeat sent successfully")
                else:
                    self.log(f"❌ Bob heartbeat response invalid: {result}")
                    return False
            else:
                self.log(f"❌ Bob heartbeat failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Bob heartbeat error: {str(e)}")
            return False
            
        return True

    def test_online_user_tracking(self):
        """Test GET /api/users/online - Get list of online users"""
        self.log("=== Testing Online User Tracking ===")
        
        # Alice checks online users (should see Bob)
        alice_headers = {"Authorization": f"Bearer {self.alice_token}"}
        try:
            response = requests.get(f"{self.base_url}/users/online", headers=alice_headers)
            if response.status_code == 200:
                online_users = response.json()
                
                # Should be a list
                if not isinstance(online_users, list):
                    self.log(f"❌ Online users response should be list, got: {type(online_users)}")
                    return False
                    
                # Should contain Bob but not Alice (current user excluded)
                bob_found = False
                alice_found = False
                
                for user in online_users:
                    if user['id'] == self.bob_id:
                        bob_found = True
                        if user['name'] == "Bob Smith":
                            self.log("✅ Bob found in online users with correct name")
                        else:
                            self.log(f"❌ Bob found but name incorrect: {user['name']}")
                            return False
                    elif user['id'] == self.alice_id:
                        alice_found = True
                        
                if bob_found and not alice_found:
                    self.log("✅ Online users list correct - Bob present, Alice (current user) excluded")
                elif not bob_found:
                    self.log("❌ Bob not found in online users list")
                    return False
                elif alice_found:
                    self.log("❌ Alice (current user) should not appear in her own online users list")
                    return False
                    
            else:
                self.log(f"❌ Get online users failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Get online users error: {str(e)}")
            return False
            
        # Bob checks online users (should see Alice)
        bob_headers = {"Authorization": f"Bearer {self.bob_token}"}
        try:
            response = requests.get(f"{self.base_url}/users/online", headers=bob_headers)
            if response.status_code == 200:
                online_users = response.json()
                
                alice_found = False
                bob_found = False
                
                for user in online_users:
                    if user['id'] == self.alice_id:
                        alice_found = True
                    elif user['id'] == self.bob_id:
                        bob_found = True
                        
                if alice_found and not bob_found:
                    self.log("✅ Bob's online users list correct - Alice present, Bob (current user) excluded")
                else:
                    self.log(f"❌ Bob's online users list incorrect - Alice found: {alice_found}, Bob found: {bob_found}")
                    return False
                    
            else:
                self.log(f"❌ Bob get online users failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Bob get online users error: {str(e)}")
            return False
            
        return True

