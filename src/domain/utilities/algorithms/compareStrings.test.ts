import compareStrings from "./compareStrings"

describe("Test of the compareStrings method", () => {
  it("Should return -1 when the first string is before the last, alphabetically", () => {
    expect(compareStrings("aksfmak", "udgjbgujd")).toBe(-1)
    expect(compareStrings("AAAAA", "Basfkandgnjb")).toBe(-1)
    expect(compareStrings("cmdqwoncioqjwdc", "cmdqwoncioqjwdd")).toBe(-1)
    expect(compareStrings("Kxsokbskcjb", "Pxsokbskcjb")).toBe(-1)
    expect(compareStrings("123123", "1231234")).toBe(-1)
    expect(compareStrings("vmsalvascl", "vmsazdvasnfb")).toBe(-1)
  })  

  it("Should return 0 when both strings are identical", () => {
    expect(compareStrings("aksmdkasd", "aksmdkasd")).toBe(0)
    expect(compareStrings("1 9enfh129efh129ef", "1 9enfh129efh129ef")).toBe(0)
    expect(compareStrings("AISBDFIKAfikABDFBADFBABDFKDADFNKFNAKnakdnfolankdfwg90gunNASIDVIASDbvIADVBDJVDBSJDNVBASJKDVBASJCNVB", "AISBDFIKAfikABDFBADFBABDFKDADFNKFNAKnakdnfolankdfwg90gunNASIDVIASDbvIADVBDJVDBSJDNVBASJKDVBASJCNVB")).toBe(0)
    expect(compareStrings("1cynt92147ty9214t92147ty", "1cynt92147ty9214t92147ty")).toBe(0)
    expect(compareStrings("pedro", "pedro")).toBe(0)
  })

  it("Should return 1 when the first string is after the last, alphabetically", () => {
    expect(compareStrings("viwefvikbwefv", "qwrimvqwrmv")).toBe(1)
    expect(compareStrings("9m92mhwijvhbskj", "8m92mhwijvhbskj")).toBe(1)
    expect(compareStrings("pedro", "a")).toBe(1)
    expect(compareStrings("bankcbnakc", "aksmakdhn")).toBe(1)
    expect(compareStrings("omqceomadm", "amvasdknbkn")).toBe(1)
    expect(compareStrings("bksfnkbasvcbl", "bksfnkbasvcbk")).toBe(1)
  })

})