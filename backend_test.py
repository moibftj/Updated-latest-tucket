#!/usr/bin/env python3
"""
Tucker Trips Backend API Test Suite
Tests all authentication and trip management endpoints
"""

import requests
import json
import sys
from datetime import datetime, timedelta

# Get base URL from environment
BASE_URL = "https://journey-notes-3.preview.emergentagent.com/api"

class TuckerTripsAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.auth_token = None
        self.user_data = None
        self.created_trip_id = None
        
        # Test data
        self.test_user = {
            "email": "tucker@test.com",
            "password": "test123",
            "name": "Tucker Test"
        }
        
        self.test_trip = {
            "title": "Japan Spring 2026",
            "destination": "Tokyo, Japan",
            "startDate": "2026-03-28",
            "endDate": "2026-04-08",
            "segments": [
                {
                    "type": "flight",
                    "title": "Flight to Tokyo",
                    "details": {
                        "airline": "JAL",
                        "flightNumber": "JL061",
                        "departure": "LAX",
                        "arrival": "NRT",
                        "departureTime": "2026-03-28T11:50:00Z",
                        "arrivalTime": "2026-03-29T15:05:00Z"
                    }
                },
                {
                    "type": "accommodation",
                    "title": "Hotel in Shibuya",
                    "details": {
                        "name": "Shibuya Sky Hotel",
                        "address": "1-1-1 Shibuya, Tokyo",
                        "checkIn": "2026-03-29",
                        "checkOut": "2026-04-05",
                        "nights": 7
                    }
                },
                {
                    "type": "transport",
                    "title": "JR Pass",
                    "details": {
                        "type": "7-day JR Pass",
                        "validFrom": "2026-03-29",
                        "validTo": "2026-04-05"
                    }
                }
            ]
        }

    def make_request(self, method, endpoint, data=None, headers=None):
        """Make HTTP request with proper error handling"""
        url = f"{self.base_url}{endpoint}"
        
        # Default headers
        default_headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        if headers:
            default_headers.update(headers)
            
        # Add auth token if available
        if self.auth_token:
            default_headers['Authorization'] = f'Bearer {self.auth_token}'
        
        try:
            if method.upper() == 'GET':
                response = self.session.get(url, headers=default_headers)
            elif method.upper() == 'POST':
                response = self.session.post(url, json=data, headers=default_headers)
            elif method.upper() == 'PATCH':
                response = self.session.patch(url, json=data, headers=default_headers)
            elif method.upper() == 'DELETE':
                response = self.session.delete(url, headers=default_headers)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            return response
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            return None

    def test_user_registration(self):
        """Test POST /api/auth/register"""
        print("\n🧪 Testing User Registration...")
        
        response = self.make_request('POST', '/auth/register', self.test_user)
        
        if not response:
            print("❌ Registration failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'user' in data and 'token' in data:
                    self.user_data = data['user']
                    self.auth_token = data['token']
                    print(f"✅ Registration successful")
                    print(f"   User ID: {self.user_data['id']}")
                    print(f"   Email: {self.user_data['email']}")
                    print(f"   Name: {self.user_data['name']}")
                    print(f"   Token received: {len(self.auth_token)} chars")
                    return True
                else:
                    print(f"❌ Registration failed - Missing user or token in response")
                    print(f"   Response: {data}")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Registration failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Registration failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Registration failed - Status {response.status_code}")
            return False

    def test_user_login(self):
        """Test POST /api/auth/login"""
        print("\n🧪 Testing User Login...")
        
        login_data = {
            "email": self.test_user["email"],
            "password": self.test_user["password"]
        }
        
        response = self.make_request('POST', '/auth/login', login_data)
        
        if not response:
            print("❌ Login failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'user' in data and 'token' in data:
                    self.user_data = data['user']
                    self.auth_token = data['token']
                    print(f"✅ Login successful")
                    print(f"   User ID: {self.user_data['id']}")
                    print(f"   Email: {self.user_data['email']}")
                    print(f"   Token received: {len(self.auth_token)} chars")
                    return True
                else:
                    print(f"❌ Login failed - Missing user or token in response")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Login failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Login failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Login failed - Status {response.status_code}")
            return False

    def test_get_user_profile(self):
        """Test GET /api/auth/me"""
        print("\n🧪 Testing Get User Profile...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
            
        response = self.make_request('GET', '/auth/me')
        
        if not response:
            print("❌ Get profile failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'user' in data:
                    user = data['user']
                    print(f"✅ Profile retrieved successfully")
                    print(f"   User ID: {user['id']}")
                    print(f"   Email: {user['email']}")
                    print(f"   Name: {user['name']}")
                    return True
                else:
                    print(f"❌ Profile retrieval failed - Missing user in response")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Profile retrieval failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Profile retrieval failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Profile retrieval failed - Status {response.status_code}")
            return False

    def test_unauthorized_access(self):
        """Test that protected routes return 401 without token"""
        print("\n🧪 Testing Unauthorized Access...")
        
        # Temporarily remove token
        temp_token = self.auth_token
        self.auth_token = None
        
        # Test protected endpoints
        endpoints = ['/auth/me', '/trips']
        
        all_passed = True
        for endpoint in endpoints:
            response = self.make_request('GET', endpoint)
            if response and response.status_code == 401:
                print(f"✅ {endpoint} correctly returns 401 without token")
            else:
                print(f"❌ {endpoint} should return 401 without token, got {response.status_code if response else 'No response'}")
                all_passed = False
        
        # Restore token
        self.auth_token = temp_token
        return all_passed

    def test_create_trip(self):
        """Test POST /api/trips"""
        print("\n🧪 Testing Create Trip...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
            
        response = self.make_request('POST', '/trips', self.test_trip)
        
        if not response:
            print("❌ Create trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'id' in data:
                    self.created_trip_id = data['id']
                    print(f"✅ Trip created successfully")
                    print(f"   Trip ID: {data['id']}")
                    print(f"   Title: {data['title']}")
                    print(f"   Destination: {data['destination']}")
                    print(f"   Start Date: {data['startDate']}")
                    print(f"   End Date: {data['endDate']}")
                    print(f"   Segments: {len(data.get('segments', []))} items")
                    return True
                else:
                    print(f"❌ Trip creation failed - Missing trip ID in response")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Trip creation failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Trip creation failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Trip creation failed - Status {response.status_code}")
            return False

    def test_list_trips(self):
        """Test GET /api/trips"""
        print("\n🧪 Testing List Trips...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
            
        response = self.make_request('GET', '/trips')
        
        if not response:
            print("❌ List trips failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                trips = response.json()
                if isinstance(trips, list):
                    print(f"✅ Trips listed successfully")
                    print(f"   Found {len(trips)} trips")
                    
                    if len(trips) > 0:
                        trip = trips[0]
                        print(f"   First trip: {trip.get('title', 'No title')} - {trip.get('destination', 'No destination')}")
                    
                    return True
                else:
                    print(f"❌ List trips failed - Response is not a list")
                    return False
            except json.JSONDecodeError:
                print(f"❌ List trips failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ List trips failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ List trips failed - Status {response.status_code}")
            return False

    def test_get_trip_by_id(self):
        """Test GET /api/trips/:id"""
        print("\n🧪 Testing Get Trip by ID...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
            
        if not self.created_trip_id:
            print("❌ No trip ID available")
            return False
            
        response = self.make_request('GET', f'/trips/{self.created_trip_id}')
        
        if not response:
            print("❌ Get trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                trip = response.json()
                if 'id' in trip:
                    print(f"✅ Trip retrieved successfully")
                    print(f"   Trip ID: {trip['id']}")
                    print(f"   Title: {trip['title']}")
                    print(f"   Destination: {trip['destination']}")
                    print(f"   Segments: {len(trip.get('segments', []))} items")
                    return True
                else:
                    print(f"❌ Get trip failed - Missing trip ID in response")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Get trip failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Get trip failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Get trip failed - Status {response.status_code}")
            return False

    def test_update_trip(self):
        """Test PATCH /api/trips/:id"""
        print("\n🧪 Testing Update Trip...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
            
        if not self.created_trip_id:
            print("❌ No trip ID available")
            return False
            
        update_data = {
            "title": "Japan Spring 2026 - Updated",
            "destination": "Tokyo & Kyoto, Japan"
        }
        
        response = self.make_request('PATCH', f'/trips/{self.created_trip_id}', update_data)
        
        if not response:
            print("❌ Update trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                trip = response.json()
                if 'id' in trip:
                    print(f"✅ Trip updated successfully")
                    print(f"   Trip ID: {trip['id']}")
                    print(f"   Updated Title: {trip['title']}")
                    print(f"   Updated Destination: {trip['destination']}")
                    return True
                else:
                    print(f"❌ Update trip failed - Missing trip ID in response")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Update trip failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Update trip failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Update trip failed - Status {response.status_code}")
            return False

    def test_delete_trip(self):
        """Test DELETE /api/trips/:id"""
        print("\n🧪 Testing Delete Trip...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
            
        if not self.created_trip_id:
            print("❌ No trip ID available")
            return False
            
        response = self.make_request('DELETE', f'/trips/{self.created_trip_id}')
        
        if not response:
            print("❌ Delete trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                result = response.json()
                if result.get('success'):
                    print(f"✅ Trip deleted successfully")
                    return True
                else:
                    print(f"❌ Delete trip failed - Success not confirmed")
                    return False
            except json.JSONDecodeError:
                print(f"❌ Delete trip failed - Invalid JSON response")
                return False
        else:
            try:
                error_data = response.json()
                print(f"❌ Delete trip failed - {error_data.get('error', 'Unknown error')}")
            except:
                print(f"❌ Delete trip failed - Status {response.status_code}")
            return False

    def run_all_tests(self):
        """Run all API tests in sequence"""
        print("🚀 Starting Tucker Trips Backend API Tests")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)
        
        test_results = {}
        
        # Authentication Tests
        test_results['registration'] = self.test_user_registration()
        test_results['login'] = self.test_user_login()
        test_results['profile'] = self.test_get_user_profile()
        test_results['unauthorized'] = self.test_unauthorized_access()
        
        # Trip Tests
        test_results['create_trip'] = self.test_create_trip()
        test_results['list_trips'] = self.test_list_trips()
        test_results['get_trip'] = self.test_get_trip_by_id()
        test_results['update_trip'] = self.test_update_trip()
        test_results['delete_trip'] = self.test_delete_trip()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        passed = 0
        total = len(test_results)
        
        for test_name, result in test_results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"{test_name.replace('_', ' ').title()}: {status}")
            if result:
                passed += 1
        
        print(f"\nOverall: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print(f"⚠️  {total - passed} tests failed. Backend needs attention.")
            return False

if __name__ == "__main__":
    tester = TuckerTripsAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)