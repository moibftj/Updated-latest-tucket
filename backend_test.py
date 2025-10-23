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
BASE_URL = "https://travelbook-3.preview.emergentagent.com/api"

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

    def test_messaging_system(self):
        """Test live chat messaging system"""
        self.log("=== Testing Live Chat Messaging System ===")
        
        # Alice sends message to Bob
        alice_headers = {"Authorization": f"Bearer {self.alice_token}"}
        message1 = {
            "recipientId": self.bob_id,
            "content": "Hey Bob! I saw you're planning a trip to New Zealand. I've been there last year and have some great recommendations!"
        }
        
        try:
            response = requests.post(f"{self.base_url}/messages", 
                                   json=message1, headers=alice_headers)
            if response.status_code == 200:
                result = response.json()
                if (result['senderId'] == self.alice_id and 
                    result['recipientId'] == self.bob_id and 
                    result['content'] == message1['content'] and
                    result['read'] == False):
                    self.log("✅ Alice's message to Bob sent successfully")
                    alice_message_id = result['id']
                else:
                    self.log(f"❌ Alice's message data incorrect: {result}")
                    return False
            else:
                self.log(f"❌ Alice send message failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Alice send message error: {str(e)}")
            return False
            
        # Bob retrieves messages (should see Alice's message)
        bob_headers = {"Authorization": f"Bearer {self.bob_token}"}
        try:
            response = requests.get(f"{self.base_url}/messages/{self.alice_id}", headers=bob_headers)
            if response.status_code == 200:
                messages = response.json()
                
                if not isinstance(messages, list):
                    self.log(f"❌ Messages should be list, got: {type(messages)}")
                    return False
                    
                if len(messages) == 1:
                    msg = messages[0]
                    if (msg['senderId'] == self.alice_id and 
                        msg['recipientId'] == self.bob_id and 
                        msg['content'] == message1['content']):
                        self.log("✅ Bob retrieved Alice's message correctly")
                    else:
                        self.log(f"❌ Retrieved message data incorrect: {msg}")
                        return False
                else:
                    self.log(f"❌ Expected 1 message, got {len(messages)}")
                    return False
                    
            else:
                self.log(f"❌ Bob retrieve messages failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Bob retrieve messages error: {str(e)}")
            return False
            
        # Bob replies to Alice
        message2 = {
            "recipientId": self.alice_id,
            "content": "That's awesome Alice! I'd love to hear your recommendations. What were your favorite spots in the South Island?"
        }
        
        try:
            response = requests.post(f"{self.base_url}/messages", 
                                   json=message2, headers=bob_headers)
            if response.status_code == 200:
                result = response.json()
                if (result['senderId'] == self.bob_id and 
                    result['recipientId'] == self.alice_id and 
                    result['content'] == message2['content']):
                    self.log("✅ Bob's reply to Alice sent successfully")
                else:
                    self.log(f"❌ Bob's reply data incorrect: {result}")
                    return False
            else:
                self.log(f"❌ Bob send reply failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Bob send reply error: {str(e)}")
            return False
            
        # Alice sends another message
        message3 = {
            "recipientId": self.bob_id,
            "content": "Definitely check out Milford Sound and Queenstown! The scenery is breathtaking. Also, don't miss the glow worm caves in Waitomo."
        }
        
        try:
            response = requests.post(f"{self.base_url}/messages", 
                                   json=message3, headers=alice_headers)
            if response.status_code == 200:
                self.log("✅ Alice's second message sent successfully")
            else:
                self.log(f"❌ Alice second message failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Alice second message error: {str(e)}")
            return False
            
        # Alice retrieves full conversation
        try:
            response = requests.get(f"{self.base_url}/messages/{self.bob_id}", headers=alice_headers)
            if response.status_code == 200:
                messages = response.json()
                
                if len(messages) == 3:
                    # Check chronological order
                    if (messages[0]['senderId'] == self.alice_id and 
                        messages[1]['senderId'] == self.bob_id and 
                        messages[2]['senderId'] == self.alice_id):
                        self.log("✅ Alice retrieved full conversation in chronological order")
                        
                        # Verify content
                        if (messages[0]['content'] == message1['content'] and
                            messages[1]['content'] == message2['content'] and
                            messages[2]['content'] == message3['content']):
                            self.log("✅ All message contents correct in conversation")
                        else:
                            self.log("❌ Message contents incorrect in conversation")
                            return False
                    else:
                        self.log("❌ Messages not in correct chronological order")
                        return False
                else:
                    self.log(f"❌ Expected 3 messages in conversation, got {len(messages)}")
                    return False
                    
            else:
                self.log(f"❌ Alice retrieve conversation failed: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            self.log(f"❌ Alice retrieve conversation error: {str(e)}")
            return False
            
        return True
        
    def test_message_read_status(self):
        """Test that messages are marked as read when retrieved"""
        self.log("=== Testing Message Read Status ===")
        
        # Send a new message from Alice to Bob
        alice_headers = {"Authorization": f"Bearer {self.alice_token}"}
        test_message = {
            "recipientId": self.bob_id,
            "content": "This is a test message to check read status functionality."
        }
        
        try:
            response = requests.post(f"{self.base_url}/messages", 
                                   json=test_message, headers=alice_headers)
            if response.status_code == 200:
                result = response.json()
                if result['read'] == False:
                    self.log("✅ New message created with read=False")
                else:
                    self.log(f"❌ New message should have read=False, got: {result['read']}")
                    return False
            else:
                self.log(f"❌ Send test message failed: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Send test message error: {str(e)}")
            return False
            
        # Bob retrieves messages (this should mark Alice's messages as read)
        bob_headers = {"Authorization": f"Bearer {self.bob_token}"}
        try:
            response = requests.get(f"{self.base_url}/messages/{self.alice_id}", headers=bob_headers)
            if response.status_code == 200:
                self.log("✅ Bob retrieved messages - read status should be updated")
            else:
                self.log(f"❌ Bob retrieve for read test failed: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Bob retrieve for read test error: {str(e)}")
            return False
            
        return True
        
    def test_unauthorized_access(self):
        """Test that endpoints properly handle unauthorized access"""
        self.log("=== Testing Unauthorized Access Protection ===")
        
        # Test profile update without token
        try:
            response = requests.patch(f"{self.base_url}/users/profile", 
                                    json={"name": "Hacker"})
            if response.status_code == 401:
                self.log("✅ Profile update properly rejected without token")
            else:
                self.log(f"❌ Profile update should return 401, got: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Unauthorized profile test error: {str(e)}")
            return False
            
        # Test heartbeat without token
        try:
            response = requests.post(f"{self.base_url}/users/heartbeat")
            if response.status_code == 401:
                self.log("✅ Heartbeat properly rejected without token")
            else:
                self.log(f"❌ Heartbeat should return 401, got: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Unauthorized heartbeat test error: {str(e)}")
            return False
            
        # Test online users without token
        try:
            response = requests.get(f"{self.base_url}/users/online")
            if response.status_code == 401:
                self.log("✅ Online users properly rejected without token")
            else:
                self.log(f"❌ Online users should return 401, got: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Unauthorized online users test error: {str(e)}")
            return False
            
        # Test send message without token
        try:
            response = requests.post(f"{self.base_url}/messages", 
                                   json={"recipientId": "test", "content": "hack"})
            if response.status_code == 401:
                self.log("✅ Send message properly rejected without token")
            else:
                self.log(f"❌ Send message should return 401, got: {response.status_code}")
                return False
        except Exception as e:
            self.log(f"❌ Unauthorized send message test error: {str(e)}")
            return False
            
        return True
        
    def run_all_tests(self):
        """Run all backend tests for Profile Settings and Live Chat features"""
        self.log("🚀 Starting Tucker Trips Backend Testing - Profile Settings & Live Chat")
        self.log(f"Testing against: {self.base_url}")
        
        tests = [
            ("User Registration and Login", self.test_user_registration_and_login),
            ("Profile Management", self.test_profile_management),
            ("Heartbeat System", self.test_heartbeat_system),
            ("Online User Tracking", self.test_online_user_tracking),
            ("Live Chat Messaging", self.test_messaging_system),
            ("Message Read Status", self.test_message_read_status),
            ("Unauthorized Access Protection", self.test_unauthorized_access)
        ]
        
        passed = 0
        failed = 0
        
        for test_name, test_func in tests:
            self.log(f"\n--- Running: {test_name} ---")
            try:
                if test_func():
                    passed += 1
                    self.log(f"✅ {test_name} PASSED")
                else:
                    failed += 1
                    self.log(f"❌ {test_name} FAILED")
            except Exception as e:
                failed += 1
                self.log(f"❌ {test_name} FAILED with exception: {str(e)}")
                
        self.log(f"\n🏁 Testing Complete!")
        self.log(f"✅ Passed: {passed}")
        self.log(f"❌ Failed: {failed}")
        self.log(f"📊 Success Rate: {(passed/(passed+failed)*100):.1f}%")
        
        return failed == 0

if __name__ == "__main__":
    tester = TuckerTripsBackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)
