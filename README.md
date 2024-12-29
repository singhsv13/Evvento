
# Evvento - Event Manager App  

Evvento is a user-friendly event management application built using Angular. It helps users browse and manage events effortlessly with features like authentication, event registration, filtering, sorting, and pagination. The app is styled using Bootstrap for a modern and responsive design.  

## Features  
- **User Authentication**: Login and logout functionality with a dynamic navigation bar.  
- **Event Registration**: Register or unregister for events directly from the event details page.  
- **Dynamic Filtering and Sorting**: Filter and sort events by date or name (ascending/descending).  
- **Pagination**: Navigate through events, displaying 6 events per page with 3 events per row.  
- **Edit and Register Modes**: Seamlessly switch between edit and registration modes in forms.  
- **Pre-filled Forms in Edit Mode**: Automatically load event details when editing an event.  
- **Dynamic Button Toggle**: Switch between "Register" and "Unregister" buttons based on user status.  

## Tech Stack  
- **Frontend**: Angular  
- **Styling**: BootStrap  

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/evvento.git  
   cd evvento  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Run the app:  
   ```bash  
   ng serve  
   ```  

4. Open in your browser at `http://localhost:4200`.  

## Usage  

### Home Component  
- Displays a list of all available events with filtering, sorting, and pagination options.  

### My Events Component  
- Shows all events registered by the user with pagination.  

### Event Details Component  
- Provides detailed information about an event.  
- Allows users to register or unregister for events.  

### Forms  
- **Registration Form**: Add new events with ease.  
- **Edit Form**: Update existing events with pre-filled data.  

## Future Enhancements  
- Implement advanced state management with NgRx.  

## Contributing  
Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements.  

## License  
This project is licensed under the MIT License.  

---  

  
