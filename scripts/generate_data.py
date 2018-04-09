import json
from random import randint
import requests
import requests_cache

congresses = ["112", "113", "114", "115"]
chambers = ["house", "senate"]
baseurl = "https://api.propublica.org/congress/v1/"


def main():

    requests_cache.install_cache('the_cache')

    with open("config.json", "r") as f:
        api_key = json.load(f)["propublica_api_key"]
    print("Using API Key: %s" % api_key)

    # r = requests.get(
    #     "https://api.propublica.org/congress/v1/115/house/committees/HSAS/subcommittees/HSAS28.json",
    #     headers={"X-API-Key": api_key}
    # ).json()
    # print(r)
    # return

    data = get_member_data(api_key)

    with open("members.json", "w") as f:
        json.dump(data, f)

    data = get_comittee_data(api_key)

    with open("comittees.json", "w") as f:
        json.dump(data, f)


def get_member_data(api_key):
    output = {}
    for congress in congresses:
        for chamber in chambers:
            url = "{baseurl}{congress}/{chamber}/members.json".format(
                baseurl=baseurl,
                congress=congress,
                chamber=chamber
            )
            print(url)
            # print(api_key)
            r = requests.get(url,
                             headers={"X-API-Key": api_key}).json()
            if not congress in output:
                output[congress] = {}
            # print(r)

            # TODO: Add real campaign finance data
            # TODO: Change IDs
            industry_keys = ["A", "B", "C", "D", "E", "F", "H",
                             "K", "M", "N", "Q", "P", "W", "Y"]
            members = r["results"][0]["members"]
            for member in members:
                member["SectorTotals"] = {}
                for key in industry_keys:
                    member["SectorTotals"][key] = randint(0, 10000)
                member["CID"] = member["id"]
                member["Name"] = member["first_name"] + \
                    " " + member["last_name"]
                member["Party"] = member["party"]
            output[congress][chamber] = members
    return output


def get_comittee_data(api_key):
    output = {}
    baseurl = "https://api.propublica.org/congress/v1/"
    for congress in congresses:
        for chamber in chambers:
            url = "{baseurl}{congress}/{chamber}/committees.json".format(
                baseurl=baseurl,
                congress=congress,
                chamber=chamber
            )
            r = requests.get(url,
                             headers={"X-API-Key": api_key}).json()
            if not congress in output:
                output[congress] = {}
            output[congress][chamber] = r["results"][0]["committees"]

            for committee in r["results"][0]["committees"]:

                r2 = requests.get(committee["api_uri"],
                                  headers={"X-API-Key": api_key}).json()
                committee["member_ids"] = list(map(
                    lambda x: x["id"], r2["results"][0]["current_members"]))

                n = committee["name"]
                n = n.replace("Committee on ", "")
                n = n.replace("the Budget", "Budget")
                n = n.replace("the Judiciary", "Judiciary")
                n = n.replace("Governmental Affairs", "Govt. Affairs")
                n = n.replace("International", "Intl.")
                committee["name"] = n

                print(committee["name"])

    #   if (firstsubstring == "Senate Committee on") {
    #     committeename = committeename.substring(20)
    #   } else if (firstsubstring == "Senate Select Commi") {
    #     committeename = committeename.substring(27)
    #   } else if (firstsubstring == "Senate Special Comm") {
    #     committeename = committeename.substring(27)
    #   } else if (firstsubstring == "Senate Commission on") {
    #     committeename = committeename.substring(21)
    #   }
    #   if (firstsubstring == "House Committee on ") {
    #     committeename = committeename.substring(19)
    #   } else if (firstsubstring == "House Permanent Sel") {
    #     committeename = committeename.substring(35)
    #   }
    # }

                if int(congress) < 114:
                    continue

                for subcomittee in committee["subcommittees"]:
                    r3 = requests.get(subcomittee["api_uri"],
                                      headers={"X-API-Key": api_key}).json()
                    if r3["status"] == "OK":
                        subcomittee["member_ids"] = list(map(
                            lambda x: x["id"],
                            r3["results"][0]["current_members"]))
    return output


if __name__ == '__main__':
    main()
