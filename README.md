# **React Native Case - Bikes & Cars Parking Availability App**

## **Introduction**
Hi there! This is my take on the case for the React Native Developer role at In The Pocket. I tried to follow the instructions sent over email precisely, focusing on the core functionality. It was fun building it and had some things to learn.
I hope it gives you a good sense of my coding style and maybe you'll help improve it :) 

## **Project Structure**
The project is organized into distinct folders to enhance readability and modularity:

- **/components**: Reusable UI components, such as ParkingListItem and StationListItem. Each component includes:
  - **index.tsx**: The main component file.
  - **styles.tsx**: Component-specific styles.
  - **__tests__**: Unit tests
- **/hooks**: Custom hooks like useFetchStations and useFetchParkings for data fetching and state management, tailored to specific API requirements.
- **/services**: API service logic is centralized here, keeping API calls separate from components and screens.
- **/types**: Defines TypeScript interfaces and types shared across the app, ensuring data consistency.
- **/screens**: Main screens, including **BikesScreen** and **ParkingsScreen**, with:
  - **index.tsx**: Screen component.
  - **styles.tsx**: Screen-specific styles.
  - **__tests__**: Tests for screen functionality, like BikesScreen.test.tsx.

This structure keeps the codebase organized, making it easier to maintain and scale as needed.

## Technical Choices
### React Native + Expo 
I chose Expo for a faster, smoother development process across both IOS and Android simulators without extra configuration.

### **TypeScript**
Using **TypeScript** improved reliability and made it less error-prone. Tried to integrate it consistently in all files. 

### **Axios over Fetch API**
I chose **Axios** instead of the Fetch API because it provided:
- **Cleaner Syntax**: Axios auto-handles JSON and it reduces repetitive code.
- **Error Management**: With Axios, I could quickly add interceptors and custom error handling. Helpful for managing network errors in real-time data fetching.
- **Parallel Fetching**: I used Promise.all with Axios to fetch data from 3 bike station endpoints simultaneously. This reduced loading times and made the app more responsive by fetching data in parallel rather than sequentially.

### **Custom Hooks for Data Fetching**
I created two separate hooks for **Bikes** and **Parkings** data:
- **Separation of Concern**: Each hook is tailored to its data source, simplifying maintenance.
- **Optimized Data Handling**: The **Bikes** hook includes a 5-second interval for real-time updates, while the **Parkings** hook fetches data only on demand.

### **React Navigation with Bottom Tab Navigation**
Implemented **React Navigation** with a **Bottom Tab Navigator** for intuitive switching between **Bikes** and **Parkings** screens.

### **Bikes Screen Implementation**
- **FlatList** for efficient rendering of bike station data and scalability.
- **Station Cards**: Each flat list item displays station name, available bikes, and capacity.
- **Long Press to Copy Station Name**: Using Expo’s Clipboard API, I added a long-press gesture to copy station names.
- **Real-Time Data Fetching**: 
   To keep the **Bikes** screen’s data up-to-date, I implemented a real-time fetching mechanism within the custom useFetchStations hook:
   - **5-Second Refresh Interval**: Using setInterval within a useEffect, I set up data to refresh every 5 seconds without resetting the loading state. 
   - **State Consistency Check**: Before updating the state, the new data is compared with the existing data. If the data hasn’t changed, it doesn’t trigger a re-render, which improves efficiency and prevents unnecessary rerenders.
   - **Pull-to-Refresh**: Users can manually pull down to refresh the data, allowing for on-demand updates in addition to the automatic interval-based refresh.
   - **Error Handling and Partial Data**: While using Promise.all to fetch data from multiple endpoints, I ensured that if one endpoint fails, the other data sources can still load, and the user receives a complete dataset where available.

### **Parkings Screen Implementation**
- **Filtering and Sorting**: Implemented filtering at the API level to only fetch parking garages with 50%+ capacity, then sorted results by availability (highest to lowest) in the app. This approach minimizes data processing on the client side, improving performance.
- **Google Maps Integration**: Used Linking.openURL to open each parking location in Google Maps on tap, keeping navigation lightweight without adding a dependency for maps.

## **Extras**
### **Accessibility**
- **Screen Readers**: Used descriptive labels, hints, and roles for compatibility with screen readers.
- **Color Contrast**: Ensured high-contrast color choices between text and background to improve readability
- **Font Scaling**: Supports default font scaling, allowing the app to adapt to user-defined system font sizes.
- **Dynamic Content Announcements**: Alert. Announced “Station name copied” when a station name is copied and provided error notifications if API calls failed.

### **Third-Party Libraries**
- **Axios**: Simplified API requests and error handling.
- **React Navigation**: Created a bottom tab navigator for intuitive switching between screens.
- **Expo Clipboard API**: Enabled “copy station name” on long-press without extra native code.

## **Installation and Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AndricaNuta/itp-rn-Andrica.git
   cd itp-rn-Andrica
2. **Install dependencies**:
   ```bash
   npm install
3. **Run the app**:
   ```bash
   npx expo start
4. **Run tests**:
   ```bash
   npm run test

