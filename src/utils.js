export function formatLicenseNumber(licenseNumber) {
    const licenseStr = licenseNumber.toString();
  
    if (licenseStr.length === 7) {
      return `${licenseStr.slice(0, 2)}-${licenseStr.slice(2, 5)}-${licenseStr.slice(5)}`;
    } else if (licenseStr.length === 8) {
      return `${licenseStr.slice(0, 3)}-${licenseStr.slice(3, 5)}-${licenseStr.slice(5)}`;
    } else {
      return licenseNumber;
    }
}
