require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const Doctor = require(__server + '/models/doctor')


describe('**************** Doctor Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  var DoctorAttributes = function(name, street_address, city, state_abbrev, zip, email, web, phone, type) {
    this.name = name
    this.street_address = street_address
    this.city = city
    this.state_abbrev = state_abbrev
    this.zip = zip
    this.email = email
    this.web = web
    this.phone = phone
    this.type = type
  }

  it('inserts doctor', function () {
    var newTestDoctor = new DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', 'primary')

    return Doctor.create(newTestDoctor)
      .then(function(doctor) {
        expect(doctor.name).to.equal(newTestDoctor.name)
      })
  })

  it('retrieves all doctor data', function() {
    var newTestDoctor2 = new DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary')
    var newTestDoctor3 = new DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist')

    return Doctor.create(newTestDoctor2)
      .then( function() { return Doctor.create(newTestDoctor3) })
      .then( function() { return Doctor.getAll() })
      .then( function(allDoctors) {
        expect(allDoctors).to.have.length(2)
        expect(allDoctors[0]['name']).to.equal('Dr. Walker')
        expect(allDoctors[0]['street_address']).to.equal('125 Walnut Street')
        expect(allDoctors[0]['city']).to.equal('Austin')
        expect(allDoctors[0]['state_abbrev']).to.equal('TX')
        expect(allDoctors[1]['zip']).to.equal(32532)
        expect(allDoctors[1]['email']).to.equal('doc@rando.com')
        expect(allDoctors[1]['web']).to.equal('docrando.com')
        expect(allDoctors[1]['phone']).to.equal('0987654321')
        expect(allDoctors[1]['type']).to.equal('hypnotist')
      })

  })

  it('retrieves a doctor by name', function() {
    var newTestDoctor4 = new DoctorAttributes('Dr. Rick', '4563 First Street', 'Austin', 'TX', 78751, 'doc@rick.com', 'docrick.com', '1234567890', 'therapist')
    return Doctor.create(newTestDoctor4)
      .then( function(newTestDoctor4) { return Doctor.findByName( newTestDoctor4.name ) })
      .then( function(doctor) {
        expect(doctor['name']).to.equal('Dr. Rick')
        expect(doctor['street_address']).to.equal('4563 First Street')
        expect(doctor['city']).to.equal('Austin')
        expect(doctor['state_abbrev']).to.equal('TX')
        expect(doctor['zip']).to.equal(78751)
        expect(doctor['email']).to.equal('doc@rick.com')
        expect(doctor['web']).to.equal('docrick.com')
        expect(doctor['phone']).to.equal('1234567890')
        expect(doctor['type']).to.equal('therapist')
      })
  })

  xit('retrieves a doctor by id', function() {

  })

  xit('deletes a doctor', function() {

  })

})

