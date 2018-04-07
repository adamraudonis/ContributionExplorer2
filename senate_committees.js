function get_senate_list() {
    
var obj = {
    "response": {
        "committees": [
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSRA",
                    "name": "Senate Committee on Rules and Administration"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "JCSE",
                    "name": "Security in Europe"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSBU",
                    "name": "Senate Committee on the Budget"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SCNC",
                    "name": "International Narcotics Control"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSHR",
                    "name": "Senate Committee on Health, Education, Labor, & Pensions",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSHR_11",
                                "name": "Employment and Workplace Safety"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSHR_12",
                                "name": "Primary Health and Aging"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSHR_9",
                                "name": "Children and Families"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSBK",
                    "name": "Senate Committee on Banking, Housing, & Urban Affairs",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSBK_12",
                                "name": "Economic Policy"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSBK_4",
                                "name": "Securities, Insurance and Investment"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSBK_5",
                                "name": "Security and International Trade and Finance"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSBK_8",
                                "name": "Financial Institutions and Consumer Protection"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSBK_9",
                                "name": "Housing, Transportation and Community Development"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSFR",
                    "name": "Senate Committee on Foreign Relations",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_1",
                                "name": "European Affairs"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_12",
                                "name": "International Development and Foreign Assistance, Economic Affairs and International Environmental Protection"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_13",
                                "name": "International Operations and Organizations, Human Rights, Democracy and Global Women's Issues"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_2",
                                "name": "East Asian and Pacific Affairs"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_6",
                                "name": "Western Hemisphere, Peace Corps and Global Narcotics Affairs"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_7",
                                "name": "Near Eastern and South and Central Asian Affairs"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFR_9",
                                "name": "African Affairs"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSSB",
                    "name": "Senate Committee on Small Business & Entrepreneurship"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SLIA",
                    "name": "Senate Committee on Indian Affairs"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SLIN",
                    "name": "Senate Select Committee on Intelligence"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSJU",
                    "name": "Senate Committee on the Judiciary",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSJU_1",
                                "name": "Antitrust, Competition Policy and Consumer Rights"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSJU_2",
                                "name": "Administrative Oversight and the Courts"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSJU_21",
                                "name": "the Constitution, Civil Rights and Human Rights"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSJU_22",
                                "name": "Crime and Terrorism"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSJU_23",
                                "name": "Privacy, Technology and the Law"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSJU_4",
                                "name": "Immigration, Refugees and Border Security"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SLET",
                    "name": "Senate Select Committee on Ethics"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSFI",
                    "name": "Senate Committee on Finance",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFI_10",
                                "name": "Health Care"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFI_11",
                                "name": "Taxation and IRS Oversight"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFI_12",
                                "name": "Energy, Natural Resources, and Infrastructure"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFI_13",
                                "name": "International Trade, Customs, and Global Competitiveness"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFI_14",
                                "name": "Fiscal Responsibility and Economic Growth"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSFI_2",
                                "name": "Social Security, Pensions and Family Policy"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSEV",
                    "name": "Senate Committee on Environment and Public Works"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSAP",
                    "name": "Senate Committee on Appropriations",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_1",
                                "name": "Agriculture, Rural Development, Food and Drug Administration, and Related Agencies"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_14",
                                "name": "Department of Homeland Security"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_16",
                                "name": "Commerce, Justice, Science, and Related Agencies"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_17",
                                "name": "Department of the Interior, Environment, and Related Agencies"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_18",
                                "name": "Departments of Labor, Health and Human Services, and Education, and Related Agencies"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_19",
                                "name": "Military Construction and Veterans Affairs, and Related Agencies"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_2",
                                "name": "Department of Defense"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_20",
                                "name": "State, Foreign Operations, and Related Programs"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_22",
                                "name": "Energy and Water Development"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_23",
                                "name": "Financial Service and General Government"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_24",
                                "name": "Transportation and Housing and Urban Development, and Related Agencies"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAP_8",
                                "name": "Legislative Branch"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSAS",
                    "name": "Senate Committee on Armed Services",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAS_13",
                                "name": "SeaPower"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAS_14",
                                "name": "Airland"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAS_15",
                                "name": "Readiness and Management Support"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAS_16",
                                "name": "Strategic Forces"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAS_17",
                                "name": "Personnel"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAS_20",
                                "name": "Emerging Threats and Capabilities"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SPAG",
                    "name": "Senate Special Committee on Aging"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSGA",
                    "name": "Senate Committee on Homeland Security",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSGA_1",
                                "name": "Investigations"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSGA_13",
                                "name": "Ad Hoc Subcommittee on Contracting Oversight"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSGA_14",
                                "name": "Ad Hoc Subcommittee on Disaster Recovery and Intergovernmental Affairs"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSGA_3",
                                "name": "Oversight of Government Management, the Federal Workforce, and the District of Columbia"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSGA_9",
                                "name": "Federal Financial Management, Government Information, Federal Services, and International Security"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSEG",
                    "name": "Senate Committee on Energy and Natural Resources",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSEG_1",
                                "name": "Energy"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSEG_3",
                                "name": "Public Lands and Forests"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSEG_4",
                                "name": "National Parks"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSEG_7",
                                "name": "Water and Power"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSVA",
                    "name": "Senate Committee on Veterans' Affairs"
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSCM",
                    "name": "Senate Committee on Commerce, Science, & Transport",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_1",
                                "name": "Aviation Operations, Safety, and Security"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_20",
                                "name": "Consumer Protection, Product Safety, and Insurance"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_22",
                                "name": "Oceans, Atmosphere, Fisheries, and Coast Guard"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_24",
                                "name": "Science and Space"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_25",
                                "name": "Surface Transportation and Merchant Marine Infrastructure, Safety, and Security"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_26",
                                "name": "Communications, Technology, and the Internet"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSCM_27",
                                "name": "Competitiveness, Innovation, and Export Promotion"
                            }
                        }
                    ]
                }
            },
            {
                "committee": {
                    "chamber": "Senate",
                    "id": "SSAF",
                    "name": "Senate Committee on Agriculture, Nutrition, & Forestry",
                    "subcommittees": [
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAF_13",
                                "name": "Commodities, Markets, Trade and Risk Management"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAF_14",
                                "name": "Conservation, Forestry and Natural Resources"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAF_15",
                                "name": "Jobs, Rural Economic Growth and Energy Innovation"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAF_16",
                                "name": "Nutrition, Specialty Crops, Food and Agricultural Research"
                            }
                        },
                        {
                            "committee": {
                                "chamber": "Senate",
                                "id": "SSAF_17",
                                "name": "Livestock, Dairy, Poultry, Marketing and Agriculture Security"
                            }
                        }
                    ]
                }
            }
        ]
    }
};    
    
    return obj;
}
