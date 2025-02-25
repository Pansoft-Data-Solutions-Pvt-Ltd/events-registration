import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
   
  Button, 
  Box,
  IconButton,
  Tooltip
} from '@ellucian/react-design-system/core';
import Modal from 'react-modal';
import { Close } from '@ellucian/ds-icons/lib';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import PropTypes from 'prop-types';


Modal.setAppElement('#root');

const styles = () => ({
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: spacing40
  },
  headerImage: {
    width: '100%',
    height: '160px', // Set a fixed height for the header image
    objectFit: 'cover',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    marginBottom: spacing40
  },
  header: {
    backgroundColor: '#2596be',
    padding: spacing40,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    marginBottom: spacing40
  },
  headerText: {
    color: 'white',
    textAlign: 'center'
  },
  card: {
    marginBottom: '2px', // Reduced from 4px
    backgroundColor: 'transparent',
    borderBottom: '1px solid #e0e0e0',
    boxShadow: 'none',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    }
  },
  
 
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing40,
    gap: spacing40,
    backgroundColor: 'white',
    '& button': {
      backgroundColor: '#2596be',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      padding: '10px 20px',
      borderRadius: '4px',
      fontSize: '14px',
      border: '2px solid #2596be',
      '&:hover': {
        backgroundColor: '#4343A1',
        color: 'white'
      }
    }
  },
    
  
  noEvents: {
    textAlign: 'center',
    padding: spacing40
  },
  modalCard: {
    marginBottom: spacing40,
    backgroundColor: '#F5F5F5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing40
  },
  eventInfo: {
    flexGrow: 1,
    minWidth: '70%'
  },
  viewDetailsButton: {
    minWidth: '50px',
    height: '24px',
    fontSize: '12px',
    padding: '0 8px',
    backgroundColor: '#6366F1',
    color: 'white',
    borderRadius: '4px',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: '#4F46E5'
    }
  },

  eventName: {
    fontSize: '14px',
    color: '#1F2937',
    fontWeight: 'normal'
  },
  
  modalCardContent: {
    flex: 1,
    marginRight: spacing40
  },
  detailsContainer: {
    padding: spacing40
  },
  detailsRow: {
    display: 'flex',
    marginBottom: spacing40,
    borderBottom: '1px solid #eee',
    paddingBottom: spacing40
  },
  detailsLabel: {
    width: '150px',
    fontWeight: 'bold'
  },
  detailsValue: {
    flex: 1
  },
  loadingText: {
    textAlign: 'center',
    padding: spacing40
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: spacing40
  },
  successModal: {
    textAlign: 'center',
    padding: spacing40
  },
  successIcon: {
    color: '#4CAF50',
    fontSize: '48px',
    marginBottom: spacing40
  },
  registeredBadge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    marginLeft: spacing40,
    fontSize: '0.8rem'
  },
  closeIconContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    cursor: 'pointer'
  },
  closeIcon: {
    color: 'white',
    fontSize: '24px',
    padding: '4px'
  },
  registeredEventCard: {
    marginBottom: '8px',
    backgroundColor: '#F5F5F5',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '50px',  // Compact height
  },
  registeredEventContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '8px 12px',
    gap: '8px',
  },
  
  mainHeader: {
    marginBottom: spacing40,
    backgroundColor: '#2596be',
    padding: spacing40,
    borderRadius: '4px'
  },
  iconButton: {
    padding: '4px',
    backgroundColor: 'white',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  eventList: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    padding: '16px',
  },
  eventRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #E5E7EB',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  listHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '16px'
  },
  subHeader: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '16px'
  }
});

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '900px',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '0',
    border: 'none',
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
  }
};

const RegisteredEvents = ({ classes }) => {
  const [events, setEvents] = useState([]);
  const [userName, setUserName] = useState('User');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  //const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [registeredEventDetails, setRegisteredEventDetails] = useState(null);
  const [userRegisteredEvents, setUserRegisteredEvents] = useState([]);
  const [currentBannerId, setCurrentBannerId] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //const [currentUserId, setCurrentUserId] = useState(null);
  const filteredEvents = events.filter(event => {
    // Check if the event has valid schedule details
    const hasValidSchedule = event.scheduleDetails?.[0]?.meetingStartOn;
    if (!hasValidSchedule) return false;
    
    // Check if the date is valid (year > 2000)
    const year = new Date(event.scheduleDetails[0].meetingStartOn).getFullYear();
    
    // Check if the event has available capacity
    const hasCapacity = event.registrantGuestLimit > 0;
    
    return year > 2000 && hasCapacity;
  });

  const formatTime = (timeString) => {
    if (!timeString) return "Time not available";
    
    try {
      // Handle time format like "1000"
      const time = timeString.toString().padStart(4, '0');
      const hours = parseInt(time.substring(0, 2));
      const minutes = time.substring(2);
      
      if (isNaN(hours)) return "Time not available";
      
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHour = hours % 12 || 12;
      
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (err) {
      console.error("Time formatting error:", err);
      return "Time not available";
    }
  };
  
  // Add this helper function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (err) {
      return "Date not available";
    }
  };

  const API_KEY = "6020297c-8506-4f23-b2db-6c95dc0f0bee";
  const TenantUrl = "https://integrate.elluciancloud.com.au";


  useEffect(() => {
    const fetchUserRegisteredEvents = async () => {
      try {
        const authResponse = await fetch(`${TenantUrl}/auth`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json'
          }
        });
        
        if (!authResponse.ok) throw new Error('Authentication failed');
        const token = await authResponse.text();
  
        // Fetch all event-function-attendance-details
        const response = await fetch(`${TenantUrl}/api/event-function-attendance-details`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
  
        if (!response.ok) throw new Error('Failed to fetch registered events');
        const data = await response.json();
        
        // Store the full registration data
        setUserRegisteredEvents(data);
        
        // Extract registration IDs for checking registration status
        //const registrationIds = data.map(event => event.id);
        //setRegisteredEventIds(registrationIds);
      } catch (err) {
        console.error('Error fetching registered events:', err);
        setError('Unable to load registered events.');
      }
    };
  
    fetchUserRegisteredEvents();
  }, []);

  
  
  

  const handleRegister = async () => {

    const currentRegistrations = userRegisteredEvents.filter(
      event => event.registrantId === currentBannerId
    ).length;
  
    if (currentRegistrations >= 5) {
      setErrorMessage("Sorry, you have already registered for 5 events.");
      setErrorModalOpen(true);
      return; // Exit early – do not proceed with registration
    }

    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        throw new Error('User ID not found');
      }
  
      // Authenticate and get token
      const authResponse = await fetch(`${TenantUrl}/auth`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      });
  
      if (!authResponse.ok) throw new Error('Authentication failed');
      const token = await authResponse.text();
  
      // First verify if the person exists
      const personResponse = await fetch(`${TenantUrl}/api/persons/${userId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
  
      if (!personResponse.ok) {
        throw new Error('Person not found in the system');
      }
  
      const personData = await personResponse.json();
      
      // Get the person's Banner ID or appropriate identifier
      const bannerIdCredential = personData.credentials.find(cred => cred.type === 'bannerId');
      const bannerId = bannerIdCredential ? bannerIdCredential.value : null;
      
      // Log the banner ID to console
      console.log('Retrieved Banner ID:', bannerId);
      
      if (!bannerId) {
        throw new Error('Banner ID not found in person data');
      }


if (!bannerId) {
  throw new Error('Banner ID not found in person data');
}

setCurrentBannerId(bannerId);

  
      // Ensure required fields exist
      if (!selectedEventDetails || !selectedEventDetails.eventReferenceNumber || !selectedEventDetails.function) {
        throw new Error("Event details are missing or invalid.");
      }
  
      // Construct registration data with verified person information
      const registrationData = {
        eventReferenceNumber: selectedEventDetails.eventReferenceNumber,
        function: selectedEventDetails.function,
        functionDescription: selectedEventDetails.functionDescription, // Use the actual Banner ID from person data
        registrantId: bannerId,
        //pidm: personData.pidm || '', // Include PIDM if available
        response: "ATTEND",
        responseEnteredOn: new Date().toISOString().split('T')[0],
        feeStatus: "PAID",
        addressType: "PR",
        nameTagName: personData.names?.[0]?.fullName || userName,
        placeCardName: personData.names?.[0]?.fullName || userName,
        ticketsRequested: "1",
        menu: "VEGETARIAN",
        registrantAttendedIndicator: true,
        adminComment: "hello",
        registrantComment: "no"
      };
  
      console.log("Sending registration data:", JSON.stringify(registrationData, null, 2));
  
      const registrationResponse = await fetch(`${TenantUrl}/api/event-function-attendance-details`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });
  
      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(`Registration failed: ${JSON.stringify(errorData)}`);
      }
  
      const newRegistration = await registrationResponse.json();
      
      // Update states with new registration
      //setCurrentRegistrationId(newRegistration.id);
      setUserRegisteredEvents(prev => [...prev, { 
        ...newRegistration,
        eventReferenceNumber: selectedEventDetails.eventReferenceNumber,
        functionDescription: selectedEventDetails.functionDescription,
        bannerId: bannerId  // Store the banner ID with the registration
      }]);
      //setCurrentRegistrationId(bannerId);
      setDetailsModalIsOpen(false);
      //setIsUnregistrationSuccess(false); // Set this to false for registration
      setSuccessModalIsOpen(true);
  
    } catch (err) {
      console.error('Registration error:', err);
      let errorMsg = err.message;
      try {
        const errorData = JSON.parse(errorMsg.substring(errorMsg.indexOf('{')));
        if (errorData.errors && errorData.errors.length > 0) {
          errorMsg = errorData.errors[0].message;
        }
      } catch (e) {
        // If JSON parsing fails, use the original error message
      }
      handleRegistrationError({ message: errorMsg });
    }
  };

  const handleRegistrationError = (error) => {
    let userFriendlyMessage = "Unable to complete registration.";
    
    // Check for capacity exceeded error
    if (error.message && error.message.includes("capacity")) {
      userFriendlyMessage = "Sorry, this event has reached its maximum capacity and is no longer accepting registrations.";
    } else if (error.message && error.message.includes("SchemaValidation")) {
      userFriendlyMessage = "Unable to process registration due to validation errors. Please try again later.";
    }
    
    setErrorMessage(userFriendlyMessage);
    setErrorModalOpen(true);
    setDetailsModalIsOpen(false); // Close the details modal
  };

  const getUniqueEvents = (events) => {
    const uniqueMap = new Map();
    
    events.forEach(event => {
      const key = event.functionDescription;
      if (key && !uniqueMap.has(key)) {
        uniqueMap.set(key, event);
      }
    });
    
    return Array.from(uniqueMap.values());
  };
  
  

  const displayEvents = currentBannerId 
  ? getUniqueEvents(userRegisteredEvents.filter(event => event.registrantId === currentBannerId))
  : [];



  
  const getCurrentUserId = () => {
    return new Promise((resolve) => {
      // First try localStorage
      const userId = localStorage.getItem('experience-user-id');
      if (userId) {
        console.log('Found user ID in localStorage:', userId);
        resolve(userId);
        return;
      }

      // Check if we're in a Chrome extension environment
      if (typeof window !== 'undefined' && window.chrome && window.chrome.storage) {
        try {
          window.chrome.storage.local.get(['experience-user-id'], function(result) {
            resolve(result['experience-user-id'] || null);
          });
        } catch (error) {
          console.error('Chrome storage error:', error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getCurrentUserId();
        console.log('Retrieved userId:', userId);

        const authResponse = await fetch(`${TenantUrl}/auth`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json'
          }
        });
        
        if (!authResponse.ok) throw new Error('Authentication failed');
        const token = await authResponse.text();

        // Fetch specific user data using the ID
        const userResponse = await fetch(`${TenantUrl}/api/persons/${userId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        console.log('User data received:', userData);

        // Extract user name from the correct structure
        if (userData && userData.names && userData.names.length > 0) {
          const preferredName = userData.names.find(name => name.preference === 'preferred') || userData.names[0];
          if (preferredName && preferredName.fullName) {
            setUserName(preferredName.fullName);
          } else if (preferredName.firstName && preferredName.lastName) {
            setUserName(`${preferredName.firstName} ${preferredName.lastName}`);
          } else {
            setUserName('Guest User');
          }
        } else {
          console.log('No name data found in user object');
          setUserName('Guest User');
        }

        if (userData && userData.credentials) {
          const bannerIdCredential = userData.credentials.find(cred => cred.type === 'bannerId');
          const bannerId = bannerIdCredential ? bannerIdCredential.value : null;
          setCurrentBannerId(bannerId);
        }

        

        // Fetch events data
        const eventsResponse = await fetch(`${TenantUrl}/api/event-function-details`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events data');
        }

        const eventsData = await eventsResponse.json();
        setEvents(eventsData.length > 0 ? eventsData : [
          {
            id: "1",
            eventDescription: "Sample Event 1",
            longDescription: "This is a sample event description"
          },
          {
            id: "2",
            eventDescription: "Sample Event 2",
            longDescription: "This is another sample event description"
          }
        ]);

      } catch (err) {
        console.error('Error in fetchData:', err);
        setError('Unable to load events. Please try again later.');
      }
    };

    fetchData();
  }, []);



  const fetchEventDetails = async (eventReferenceNumber, functionDescription) => {
    setIsLoadingDetails(true);
    setDetailsError(null);
    
    try {
        // Authenticate and get token
        const authResponse = await fetch(`${TenantUrl}/auth`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        if (!authResponse.ok) throw new Error('Authentication failed');
        const token = await authResponse.text();

        let attendanceDetails = null;
        let functionDetails = null;

        // Fetch from /api/event-function-attendance-details
        const attendanceResponse = await fetch(`${TenantUrl}/api/event-function-attendance-details/${eventReferenceNumber}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (attendanceResponse.ok) {
            attendanceDetails = await attendanceResponse.json();
            console.log("✅ Attendance API Response:", attendanceDetails);
        }

        // Now fetch from /api/event-function-details using functionDescription
        const functionResponse = await fetch(`${TenantUrl}/api/event-function-details`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (functionResponse.ok) {
            const allFunctions = await functionResponse.json();
            console.log("✅ Function API Response (All Events):", allFunctions);

            // Find the correct event by functionDescription
            functionDetails = allFunctions.find(event => event.functionDescription === functionDescription);
        } else {
            console.error("❌ Failed to fetch from event-function-details, response status:", functionResponse.status);
        }

        if (!functionDetails) {
            throw new Error(`No event found with functionDescription: ${functionDescription}`);
        }

        // Merge details from both APIs
        let eventDetails = {
            ...functionDetails, // Use function details as base
            ...attendanceDetails, // Overwrite with attendance details if available
            functionDescription: attendanceDetails?.functionDescription || functionDetails?.functionDescription || "Event Name Not Available",
            functionType: attendanceDetails?.functionType || functionDetails?.functionType || "Event Type Not Available",
            scheduleDetails: attendanceDetails?.scheduleDetails?.length 
                ? attendanceDetails.scheduleDetails
                : functionDetails?.scheduleDetails?.length
                ? functionDetails.scheduleDetails
                : [{
                    meetingStartOn: functionDetails?.meetingStartOn || "Date Not Available",
                    meetingBeginTime: functionDetails?.meetingBeginTime || "Time Not Available",
                    meetingRoomDescription: functionDetails?.meetingRoomDescription || "Meeting Room 111"
                }]
        };

        return eventDetails;
    } catch (err) {
        console.error('❌ Error fetching event details:', err);
        throw new Error('Unable to fetch event details. Please try again later.');
    } finally {
        setIsLoadingDetails(false);
    }
};



  const findMatchingEvent = (event, eventsList) => {
    // Match events based on functionDescription only
    return eventsList.find(e => e.functionDescription === event.functionDescription);
  };

  const handleViewDetails = async (event, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
        // First check if this is a registered event
        const registeredEvent = findMatchingEvent(event, userRegisteredEvents);

        let eventDetails;

        if (registeredEvent) {
            // Fetch event details using functionDescription instead of event.id
            eventDetails = await fetchEventDetails(registeredEvent.eventReferenceNumber, registeredEvent.functionDescription);

            setSelectedEventDetails({
                ...eventDetails,
                ...registeredEvent,
                registrationId: registeredEvent.id,
                scheduleDetails: eventDetails.scheduleDetails || [{
                    meetingStartOn: registeredEvent.meetingStartOn || "Date Not Available",
                    meetingEndOn: registeredEvent.meetingEndOn || "Date Not Available",
                    meetingBeginTime: registeredEvent.meetingBeginTime || "Time Not Available",
                    meetingEndTime: registeredEvent.meetingEndTime || "Time Not Available",
                    meetingRoom: registeredEvent.meetingRoom || "Room Not Available",
                    meetingRoomDescription: registeredEvent.meetingRoomDescription || "Meeting Room 111"
                }]
            });

        } else {
            // Fetch event details using functionDescription instead of event.id
            eventDetails = await fetchEventDetails(event.eventReferenceNumber, event.functionDescription);

            setSelectedEventDetails({
                ...eventDetails,
                ...event,
                scheduleDetails: eventDetails.scheduleDetails || [{
                    meetingStartOn: event.meetingStartOn || "Date Not Available",
                    meetingEndOn: event.meetingEndOn || "Date Not Available",
                    meetingBeginTime: event.meetingBeginTime || "Time Not Available",
                    meetingEndTime: event.meetingEndTime || "Time Not Available",
                    meetingRoom: event.meetingRoom || "Room Not Available",
                    meetingRoomDescription: event.meetingRoomDescription || "Meeting Room 111"
                }]
            });
        }
        
        setDetailsModalIsOpen(true);
    } catch (err) {
        console.error('❌ Error in handleViewDetails:', err);
        setDetailsError(err.message);
    }
};

  
  // Update isEventRegistered to use simplified matching
  const isEventRegistered = (event) => {
    if (!event || !currentBannerId) return false;
    return userRegisteredEvents.some(registeredEvent => 
      registeredEvent.functionDescription === event.functionDescription &&
      registeredEvent.registrantId === currentBannerId
    );
  };
  
  const handleExploreEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalIsOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setModalIsOpen(false);
  };

  const handleCloseDetailsModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDetailsModalIsOpen(false);
    setSelectedEventDetails(null);
    setDetailsError(null);
  };

  
  const handleCloseSuccessModal = () => {
    setSuccessModalIsOpen(false);
    setRegisteredEventDetails(null);
    //setIsUnregistrationSuccess(false); // Reset the state when closing
  };
  //const displayEvents = events.filter(event => registeredEventIds.includes(event.eventReferenceNumber));//....................................
  
 

  return (
    <Box className={classes.container}>
      <img 
        src="https://images.collegexpress.com/article/Exploring-Extracurricular-Activities-in-College-How-to-Find-the-Best-Opportunities.jpg" 
        alt="Events Header" 
        className={classes.headerImage}
      />
      
      <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
        Hello {userName}
      </Typography>

      {error ? (
        // Display error message if there is an error
        <Box className={classes.eventList}>
          <Typography className={classes.listHeader}>
            Student Clubs and Activities
          </Typography>
          <Typography color="error" style={{ padding: '16px 0' }}>
            {error}
          </Typography>
          <Box className={classes.buttonContainer}>
            <Button 
              color="primary"
              variant="contained"
              onClick={handleExploreEvents}
            >
              Explore Events
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className={classes.eventList}>
          <Typography className={classes.listHeader} align="center">
            Registered Events
          </Typography>
          

          {displayEvents.map((event, index) => (
            <div key={index} className={classes.eventRow}>
              <Typography className={classes.eventName}>
                {event.functionDescription || "Event Name"}
              </Typography>
              <IconButton
                onClick={(e) => handleViewDetails(event, e)}
                className={classes.iconButton}
                size="small"
              >
                <svg 
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="#2596be"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </IconButton>
            </div>
          ))}
        </Box>
      )}

      <Box className={classes.buttonContainer}>
        <Button 
          color="primary"
          variant="contained"
          onClick={handleExploreEvents}
        >
          Explore Events
        </Button>
      </Box>
      {/* Events List Modal */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={handleCloseModal}
  style={modalStyles}
  contentLabel="Registered Events Modal"
  shouldCloseOnOverlayClick={true}
  shouldCloseOnEsc={true}
>
  <Box className={classes.header}>
    <Typography variant="h2" className={classes.headerText}>
      Explore Events
    </Typography>
    <IconButton 
      style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', backgroundColor: 'transparent', zIndex: 10 }} 
      onClick={() => setModalIsOpen(false)}
    >
      <Close />
    </IconButton>
  </Box>

  <Box style={{ padding: spacing40 }}>
  {filteredEvents
  .filter(event => {
    // Check if the event is not registered by the current banner ID
    const isNotRegistered = !userRegisteredEvents.some(reg => 
      reg.registrantId === currentBannerId && 
      reg.functionDescription === event.functionDescription
    );
    return isNotRegistered;
  })
      .map((event, index) => (
        <Card key={index} className={classes.modalCard} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '16px' }}>
          <Box className={classes.modalCardContent} style={{ flexGrow: 1, minWidth: '70%' }}>
            <Typography variant="h5">
              <strong>{event.functionDescription || "Event Name"}</strong>
            </Typography>
            
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              Due Date: {event.scheduleDetails?.[0]?.meetingStartOn || "Date not available"}
            </Typography>
          </Box>
          <div className={classes.iconWrapper}>
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={(e) => handleViewDetails(event, e)}
                      className={classes.iconButton}
                      size="small"
                    >
                      <svg 
                        width="18" // Slightly smaller icon
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="white" // White fill
                        stroke="#2596be" // Blue outline (matching your theme color)
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </IconButton>
                  </Tooltip>
                </div>
        </Card>
    ))}

    {filteredEvents.filter(event => !userRegisteredEvents.some(reg => reg.functionDescription === event.functionDescription)).length === 0 && (
      <Typography variant="h6" style={{ textAlign: 'center', padding: spacing40 }}>
        No new events available for registration
      </Typography>
    )}

    <Box className={classes.buttonContainer}>
      <Button
        color="primary"
        variant="contained"
        onClick={handleCloseModal}
      >
        Close
      </Button>
    </Box>
  </Box>
</Modal>
      {/* Event Details Modal */}
      <Modal
        isOpen={detailsModalIsOpen}
        onRequestClose={handleCloseDetailsModal}
        style={modalStyles}
        contentLabel="Event Details Modal"
        //shouldCloseOnOverlayClick={true}
        //shouldCloseOnEsc={true}
      >
        <Box className={classes.header}>
          <Typography variant="h2" className={classes.headerText}>
            Event Details
          </Typography>
          <IconButton 
          className={classes.closeButton} 
          style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', backgroundColor: 'transparent', zIndex: 10 }} 
          onClick={() => setDetailsModalIsOpen(false)}
        >
          <Close />
        </IconButton>
        </Box>

        <Box className={classes.detailsContainer}>
          {isLoadingDetails ? (
            <Typography className={classes.loadingText}>
              Loading event details...
            </Typography>
          ) : detailsError ? (
            <Typography className={classes.errorText}>
              {detailsError}
            </Typography>
          ) : selectedEventDetails ? (
            <>
              <Box className={classes.detailsRow}>
  <Typography className={classes.detailsLabel}>Event ID:</Typography>
  <Typography className={classes.detailsValue}>
    {selectedEventDetails.eventReferenceNumber}
  </Typography>
  <Typography className={classes.detailsLabel} style={{ marginLeft: '20px' }}>Registration Status:</Typography>
  <Typography className={classes.detailsValue}>
    {isEventRegistered(selectedEventDetails) ? 
      `Registered (Banner ID: ${currentBannerId || 'Not available'})` : 
      'Not registered'}
  </Typography>
</Box>
              <Box className={classes.detailsRow}>
                <Typography className={classes.detailsLabel}>Event Name:</Typography>
                <Typography className={classes.detailsValue}>
                {selectedEventDetails.functionDescription}
                </Typography>
              </Box>
              <Box className={classes.detailsRow}>
              <Typography className={classes.detailsLabel}>Event-Type:</Typography>
              <Typography className={classes.detailsValue}>
                {selectedEventDetails.functionType}
              </Typography>
            </Box>

            <Box className={classes.detailsRow}>
  <Typography className={classes.detailsLabel}>Date & Time:</Typography>
  <Typography className={classes.detailsValue}>
    {(() => {
      const scheduleDetails = selectedEventDetails?.scheduleDetails?.[0];
      const formattedDate = formatDate(scheduleDetails?.meetingStartOn);
      const formattedTime = formatTime(scheduleDetails?.meetingBeginTime);
      
      return formattedTime === "Time not available" ? 
        formattedDate : 
        `${formattedDate} at ${formattedTime}`;
    })()}
  </Typography>
</Box>
              <Box className={classes.detailsRow}>
                <Typography className={classes.detailsLabel}>Location:</Typography>
                <Typography className={classes.detailsValue}>
                {selectedEventDetails.scheduleDetails?.[0]?.meetingRoomDescription || "Meeting Room 111"}
                </Typography>
              </Box>
              
              
              <Box className={classes.detailsRow}>
              <Typography className={classes.detailsLabel}>Max Participants:</Typography>
              <Typography className={classes.detailsValue}>
                  {selectedEventDetails.registrantGuestLimit}
              </Typography>
              
              </Box>
              

              
            </>
          ) : null}
          
          

          <Box className={classes.buttonContainer}>
  <Button 
    color="primary"
    variant="contained"
    onClick={handleRegister}
    disabled={isEventRegistered(selectedEventDetails)}
  >
    Register
  </Button>
  <Button
    color="secondary"
    variant="contained"
    onClick={() => console.log('Unregister button clicked')}
  >
    Unregister
  </Button>
  <Button
    color="secondary"
    variant="contained"
    onClick={handleCloseDetailsModal}
  >
    Close
  </Button>
</Box>

        </Box>
      </Modal>

      <Modal
  isOpen={errorModalOpen}
  onRequestClose={() => setErrorModalOpen(false)}
  style={modalStyles}
  contentLabel="Error Modal"
>
  <Box className={classes.header}>
    <Typography variant="h2" className={classes.headerText}>
      Registration Status
    </Typography>
    <IconButton 
      style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', backgroundColor: 'transparent', zIndex: 10 }} 
      onClick={() => setErrorModalOpen(false)}
    >
      <Close />
    </IconButton>
  </Box>

  <Box className={classes.detailsContainer}>
    <Typography 
      variant="h6" 
      style={{ textAlign: 'center', marginBottom: spacing40, color: '#666' }}
    >
      {errorMessage}
    </Typography>

    {errorMessage === "Sorry, you have already registered for 5 events." ? (
      <Box className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setErrorModalOpen(false);
            setModalIsOpen(false); // Back to Registered Events card
          }}
        >
          Back to My Events
        </Button>
      </Box>
    ) : (
      <Box className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setErrorModalOpen(false);
            setModalIsOpen(false); // Close explore events modal
          }}
        >
          Back to My Events
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setErrorModalOpen(false);
            setModalIsOpen(true); // Keep explore events modal open
          }}
        >
          Continue Exploring
        </Button>
      </Box>
    )}
  </Box>
</Modal>



      {/* New Success Modal */}
      <Modal
    isOpen={successModalIsOpen}
    onRequestClose={handleCloseSuccessModal}
    style={modalStyles}
    contentLabel="Registration Status Modal"
  >
    <Box className={classes.header}>
    <Typography variant="h2" className={classes.headerText}>
  Registration Successful
</Typography>
      <IconButton 
        className={classes.closeButton} 
        onClick={handleCloseSuccessModal}
      >
        <Close />
      </IconButton>
    </Box>

    <Box className={classes.successModal}>
    <Typography variant="h4" style={{ marginBottom: spacing40 }}>
  Congratulations! You have successfully registered for the event!
</Typography>

          {registeredEventDetails && (
            <Box className={classes.detailsContainer}>
              <Box className={classes.detailsRow}>
                <Typography className={classes.detailsLabel}>Event Name:</Typography>
                <Typography className={classes.detailsValue}>
                {selectedEventDetails.functionDescription}
                </Typography>
              </Box>
              <Box className={classes.detailsRow}>
                <Typography className={classes.detailsLabel}>Description:</Typography>
                <Typography className={classes.detailsValue}>
                  {registeredEventDetails.functionDescription}
                </Typography>
              </Box>
              <Box className={classes.detailsRow}>
                <Typography className={classes.detailsLabel}>Location:</Typography>
                <Typography className={classes.detailsValue}>
                {selectedEventDetails.scheduleDetails?.[0]?.meetingRoomDescription || "Meeting Room 111"}
                </Typography>
              </Box>
              <Box className={classes.detailsRow}>
  <Typography className={classes.detailsLabel}>Date & Time:</Typography>
  <Typography className={classes.detailsValue}>
    {(() => {
      const scheduleDetails = selectedEventDetails?.scheduleDetails?.[0];
      const formattedDate = formatDate(scheduleDetails?.meetingStartOn);
      const formattedTime = formatTime(scheduleDetails?.meetingBeginTime);
      
      return formattedTime === "Time not available" ? 
        formattedDate : 
        `${formattedDate} at ${formattedTime}`;
    })()}
  </Typography>
</Box>
            </Box>
          )}

          <Box className={classes.buttonContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleCloseSuccessModal}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

RegisteredEvents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisteredEvents);