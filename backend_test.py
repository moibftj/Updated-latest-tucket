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
        
        # Test data with unique email to avoid conflicts
        import time
        timestamp = int(time.time())
        self.test_user = {
            "email": f"tucker.{timestamp}@test.com",
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
            try:
                # Make request without auth token
                url = f"{self.base_url}{endpoint}"
                headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                response = requests.get(url, headers=headers, timeout=10)
                
                if response.status_code == 401:
                    print(f"✅ {endpoint} correctly returns 401 without token")
                else:
                    print(f"❌ {endpoint} should return 401 without token, got {response.status_code}")
                    all_passed = False
                    
            except Exception as e:
                print(f"❌ {endpoint} request failed: {e}")
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

    def test_create_trip_future_private(self):
        """Test creating a trip with status='future' and visibility='private'"""
        print("\n🧪 Testing Create Future Private Trip...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
        
        # Create trip with future status and private visibility
        start_date = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
        end_date = (datetime.now() + timedelta(days=37)).strftime("%Y-%m-%d")
        
        trip_data = {
            "title": "Future Private Trip to Tokyo",
            "destination": "Tokyo, Japan",
            "startDate": start_date,
            "endDate": end_date,
            "status": "future",
            "visibility": "private",
            "segments": [
                {
                    "type": "flight",
                    "details": {
                        "airline": "Japan Airlines",
                        "flightNumber": "JL123",
                        "departure": "LAX",
                        "arrival": "NRT"
                    }
                },
                {
                    "type": "accommodation",
                    "details": {
                        "name": "Tokyo Grand Hotel",
                        "address": "Shibuya, Tokyo"
                    }
                }
            ]
        }
        
        response = self.make_request('POST', '/trips', trip_data)
        
        if not response:
            print("❌ Create future private trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'id' in data:
                    # Verify the fields are correctly set
                    if (data.get('status') == 'future' and 
                        data.get('visibility') == 'private' and
                        data.get('title') == trip_data['title'] and
                        len(data.get('segments', [])) == 2):
                        
                        print(f"✅ Future private trip created successfully")
                        print(f"   Trip ID: {data['id']}")
                        print(f"   Status: {data.get('status')}")
                        print(f"   Visibility: {data.get('visibility')}")
                        print(f"   Segments: {len(data.get('segments', []))} items")
                        return True
                    else:
                        print(f"❌ Trip created but fields are incorrect")
                        print(f"   Expected: status='future', visibility='private', segments=2")
                        print(f"   Got: status='{data.get('status')}', visibility='{data.get('visibility')}', segments={len(data.get('segments', []))}")
                        return False
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

    def test_create_trip_taken_public(self):
        """Test creating a trip with status='taken' and visibility='public'"""
        print("\n🧪 Testing Create Taken Public Trip...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
        
        # Create trip with taken status and public visibility
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
        end_date = (datetime.now() - timedelta(days=23)).strftime("%Y-%m-%d")
        
        trip_data = {
            "title": "Past Public Trip to Paris",
            "destination": "Paris, France",
            "startDate": start_date,
            "endDate": end_date,
            "status": "taken",
            "visibility": "public",
            "segments": [
                {
                    "type": "flight",
                    "details": {
                        "airline": "Air France",
                        "flightNumber": "AF123",
                        "departure": "JFK",
                        "arrival": "CDG"
                    }
                },
                {
                    "type": "hotel",
                    "details": {
                        "name": "Hotel Le Marais",
                        "address": "Le Marais, Paris",
                        "rating": "4 stars"
                    }
                },
                {
                    "type": "transportation",
                    "details": {
                        "type": "Metro Pass",
                        "duration": "7 days"
                    }
                }
            ]
        }
        
        response = self.make_request('POST', '/trips', trip_data)
        
        if not response:
            print("❌ Create taken public trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'id' in data:
                    # Verify the fields are correctly set
                    if (data.get('status') == 'taken' and 
                        data.get('visibility') == 'public' and
                        data.get('title') == trip_data['title'] and
                        len(data.get('segments', [])) == 3):
                        
                        print(f"✅ Taken public trip created successfully")
                        print(f"   Trip ID: {data['id']}")
                        print(f"   Status: {data.get('status')}")
                        print(f"   Visibility: {data.get('visibility')}")
                        print(f"   Segments: {len(data.get('segments', []))} items")
                        return True
                    else:
                        print(f"❌ Trip created but fields are incorrect")
                        print(f"   Expected: status='taken', visibility='public', segments=3")
                        print(f"   Got: status='{data.get('status')}', visibility='{data.get('visibility')}', segments={len(data.get('segments', []))}")
                        return False
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

    def test_default_values(self):
        """Test that default values are applied when status/visibility are not provided"""
        print("\n🧪 Testing Default Status and Visibility Values...")
        
        if not self.auth_token:
            print("❌ No auth token available")
            return False
        
        # Create trip without status and visibility fields
        start_date = (datetime.now() + timedelta(days=60)).strftime("%Y-%m-%d")
        
        trip_data = {
            "title": "Default Values Test Trip",
            "destination": "London, UK",
            "startDate": start_date,
            "segments": [
                {
                    "type": "flight",
                    "details": {
                        "airline": "British Airways",
                        "flightNumber": "BA456"
                    }
                }
            ]
        }
        
        response = self.make_request('POST', '/trips', trip_data)
        
        if not response:
            print("❌ Create default trip failed - No response")
            return False
            
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                if 'id' in data:
                    # Verify default values are applied
                    if (data.get('status') == 'future' and 
                        data.get('visibility') == 'private'):
                        
                        print(f"✅ Default values applied correctly")
                        print(f"   Status: {data.get('status')} (expected: future)")
                        print(f"   Visibility: {data.get('visibility')} (expected: private)")
                        return True
                    else:
                        print(f"❌ Default values not applied correctly")
                        print(f"   Expected: status='future', visibility='private'")
                        print(f"   Got: status='{data.get('status')}', visibility='{data.get('visibility')}'")
                        return False
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
        """Test GET /api/trips and verify status/visibility fields are returned"""
        print("\n🧪 Testing List Trips with Status and Visibility Fields...")
        
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
                        # Check if all trips have status and visibility fields
                        all_have_fields = True
                        field_details = []
                        
                        for trip in trips:
                            has_status = 'status' in trip
                            has_visibility = 'visibility' in trip
                            has_segments = 'segments' in trip
                            
                            field_details.append({
                                'title': trip.get('title', 'Unknown'),
                                'status': trip.get('status', 'Missing'),
                                'visibility': trip.get('visibility', 'Missing'),
                                'segments_count': len(trip.get('segments', []))
                            })
                            
                            if not (has_status and has_visibility and has_segments):
                                all_have_fields = False
                        
                        if all_have_fields:
                            print(f"✅ All trips have status and visibility fields")
                            for detail in field_details:
                                print(f"   - {detail['title']}: status={detail['status']}, visibility={detail['visibility']}, segments={detail['segments_count']}")
                            return True
                        else:
                            print(f"❌ Some trips are missing status or visibility fields")
                            for detail in field_details:
                                print(f"   - {detail['title']}: status={detail['status']}, visibility={detail['visibility']}")
                            return False
                    else:
                        print(f"⚠️  No trips found to verify fields")
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